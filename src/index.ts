import 'dotenv/config';
import axios from 'axios';

import { authenticate } from './controllers/auth.js';
import { createUser, connectUser } from './controllers/user.js';
import { checkJob } from './controllers/job.js';
import { getUserTransactions, calculateAverage } from './controllers/transactions.js';
import { JobStep } from './iterfaces.js';

axios.defaults.baseURL = 'https://au-api.basiq.io/';

const main = async () => {
  const accessToken = await authenticate();
  const newUserId = await createUser(accessToken);
  const userConnectionId = await connectUser(accessToken, newUserId);

  console.log('[INFO] Connecting user...');
  let counter = 0;
  const intervalId = setInterval(async () => {
    const jobStatus = await checkJob(accessToken, userConnectionId);
    const transactionsStep = jobStatus.steps.find(
      (step: JobStep) => step.title === 'retrieve-transactions'
    );

    if (counter === 3) {
      console.error('Connection job timed out.');
      clearInterval(intervalId);
    }

    if (transactionsStep.status === 'success') {
      console.log('[SUCCESS] User connected');
      clearInterval(intervalId);
      console.log('[INFO] Fetching user transactions...');
      const transactions = await getUserTransactions(accessToken, newUserId);
      console.log('[SUCCESS] Fetching user transactions finished!');
      calculateAverage(transactions);
    }
    if (transactionsStep.status === 'error') {
      clearInterval(intervalId);
      console.error('[ERROR] Error occured while atempting to connect user!');
    }
    counter++;
  }, 3000);
};

(async () => {
  await main();
})();
