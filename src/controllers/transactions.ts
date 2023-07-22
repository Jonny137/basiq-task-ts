import axios from 'axios';

import { Transaction, AverageMapper } from '../iterfaces.js';

export async function getUserTransactions(
  token: string,
  id: string,
  nextQuery = ''
): Promise<Transaction[]> {
  const params = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `/users/${id}/transactions${nextQuery}`,
  };
  try {
    let transactionList = [];
    const response = await axios(params);

    if (response.data.links.next) {
      nextQuery = `?${response.data.links.next.split('?')[1]}`;
      transactionList = response.data.data.concat(
        await getUserTransactions(token, id, nextQuery)
      );
    } else {
      transactionList = response.data.data;
    }
    console.log(transactionList.length);
    return transactionList;
  } catch (err) {
    console.error(err.response.data.data);
  }
}

export function calculateAverage(transactions: Transaction[]): void {
  const groupedSums: AverageMapper = {}

  // Iterate over posted transactions, group them by subClass code and
  // calulate average
  for (let i = 0; i < transactions.length; i++) {
    if (!!transactions[i].subClass && transactions[i].status === 'posted') {
      const subClassCode = transactions[i].subClass.code
      const transactionAmount = transactions[i].amount

      if (groupedSums.hasOwnProperty(subClassCode)) {
        groupedSums[subClassCode].sum += parseFloat(transactionAmount);
        groupedSums[subClassCode].count += 1;
        groupedSums[subClassCode].average = (
          groupedSums[subClassCode].sum / groupedSums[subClassCode].count
        );
      } else {
        groupedSums[subClassCode] = {
          title: transactions[i].subClass.title,
          sum: parseFloat(transactionAmount),
          count: 1,
          average: parseFloat(transactionAmount)
        }
      }
    }
  }

  // Print out the calculated results
  console.log('[INFO] Average balance for each category:');
  console.log(groupedSums);
}
