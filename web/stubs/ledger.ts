import { TransactionAmountDir } from 'features/accounts/components/Transaction';

export const ledgerStub = [
  {
    accountId: 'account1',
    categoryId: 'cat-mortgage',
    txId: '59427557-c743-4208-85a1-82f71d086a38',
    txDate: '2022-10-28',
    txName: 'Bank of England',
    txReference: 'Hope',
    amount: '10', // units, no decimals
    currency: 'GBP',
    amountDir: 'debit' as TransactionAmountDir,
  },
  {
    accountId: 'account1',
    categoryId: null,
    txId: '0b70ffb3-4a15-446d-9ae6-fec9fe8fb92d',
    txDate: '2022-10-28',
    txName: 'Mike Holloway',
    txReference: 'Welcome Pack',
    amount: '50000', // units, no decimals
    currency: 'GBP',
    amountDir: 'credit' as TransactionAmountDir,
  },
  {
    accountId: 'account1',
    categoryId: 'cat-food',
    txId: 'cfdbe37b-df63-44dd-a3ba-8ed538d18a78',
    txDate: '2022-09-13',
    txName: 'McDonalds',
    txReference: 'Fuel',
    amount: '3000', // units, no decimals
    currency: 'GBP',
    amountDir: 'debit' as TransactionAmountDir,
  },
];
