export interface JobStep {
  title: string,
  status: string,
  result?: JobStepResult
}

interface JobStepResult {
  type: string,
  url: string 
}

export interface Transaction {
  type: string,
  id: string,
  status: string,
  description: string,
  postDate: Date,
  transactionDate: Date,
  amount: string,
  balance: string,
  account: string,
  institution: string,
  connection: string,
  enrich?: string,
  direction: string,
  class: string,
  subClass?: {
    code: number,
    title: string
  },
  links?: TransactionLinks
}

interface TransactionLinks {
  self: string,
  account: string,
  institution: string,
  connection?: string
}

export interface AverageMapper {
  [key: number]: {
    title: string,
    sum: number,
    count: number,
    average: number
  }
}
