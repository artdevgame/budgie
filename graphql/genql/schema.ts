import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    Boolean: boolean,
    Int: number,
    JSON: any,
}

export interface Account {
    accountId: Scalars['String']
    /** Has this account been closed? */
    active: Scalars['Boolean']
    name: Scalars['String']
    __typename: 'Account'
}

export type AmountDir = 'credit' | 'debit'

export interface Budget {
    /** Amount as a round number (smallest unit of the currency) */
    amount: Scalars['Int']
    categoryId: Scalars['String']
    /** Date in ISO-8601 format (YYYY-MM-DD) */
    date: Scalars['String']
    __typename: 'Budget'
}

export interface Event {
    data: Scalars['JSON']
    id: Scalars['String']
    sequence: Scalars['Int']
    timestamp: Scalars['String']
    version: Scalars['String']
    __typename: 'Event'
}

export interface Mutation {
    addTransaction: Transaction
    closeAccount: Account
    createAccount: Account
    createUser: User
    updateAccount: Account
    updateUser: User
    upsertBudget: Budget
    __typename: 'Mutation'
}

export interface Query {
    accounts: Account[]
    budget: Budget[]
    events: Event[]
    transactions: Transaction[]
    user?: User
    __typename: 'Query'
}

export interface Transaction {
    accountId: Scalars['String']
    /** A number of monetary units */
    amount: Scalars['Int']
    /** Supply "credit" or "debit" */
    amountDir: AmountDir
    categoryId: Scalars['String']
    /** Currency code (ISO-4217) */
    currency: Scalars['String']
    /** Unique identifier for the transaction within an servicing institution. */
    txId: Scalars['String']
    /** Further details of the transaction */
    txInformation: Scalars['String']
    /** Unique reference for the transaction. This reference is optionally populated. */
    txReference: Scalars['String']
    __typename: 'Transaction'
}

export interface User {
    email: Scalars['String']
    familyName: Scalars['String']
    givenName: Scalars['String']
    __typename: 'User'
}

export interface AccountRequest{
    accountId?: boolean | number
    /** Has this account been closed? */
    active?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BudgetRequest{
    /** Amount as a round number (smallest unit of the currency) */
    amount?: boolean | number
    categoryId?: boolean | number
    /** Date in ISO-8601 format (YYYY-MM-DD) */
    date?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventRequest{
    data?: boolean | number
    id?: boolean | number
    sequence?: boolean | number
    timestamp?: boolean | number
    version?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    addTransaction?: [{accountId: Scalars['String'],amount: Scalars['Int'],amountDir: AmountDir,categoryId?: (Scalars['String'] | null),currency: Scalars['String'],txId?: (Scalars['String'] | null),txInformation?: (Scalars['String'] | null),txReference?: (Scalars['String'] | null)},TransactionRequest]
    closeAccount?: [{accountId: Scalars['String']},AccountRequest]
    createAccount?: [{name: Scalars['String']},AccountRequest]
    createUser?: [{authId: Scalars['String'],email: Scalars['String'],familyName: Scalars['String'],givenName: Scalars['String']},UserRequest]
    updateAccount?: [{accountId: Scalars['String'],name: Scalars['String']},AccountRequest]
    updateUser?: [{email?: (Scalars['String'] | null),familyName?: (Scalars['String'] | null),givenName?: (Scalars['String'] | null)},UserRequest] | UserRequest
    upsertBudget?: [{amount: Scalars['Int'],categoryId: Scalars['String'],date: Scalars['String']},BudgetRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    accounts?: AccountRequest
    budget?: [{date: Scalars['String']},BudgetRequest]
    events?: EventRequest
    transactions?: [{accountId: Scalars['String']},TransactionRequest]
    user?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TransactionRequest{
    accountId?: boolean | number
    /** A number of monetary units */
    amount?: boolean | number
    /** Supply "credit" or "debit" */
    amountDir?: boolean | number
    categoryId?: boolean | number
    /** Currency code (ISO-4217) */
    currency?: boolean | number
    /** Unique identifier for the transaction within an servicing institution. */
    txId?: boolean | number
    /** Further details of the transaction */
    txInformation?: boolean | number
    /** Unique reference for the transaction. This reference is optionally populated. */
    txReference?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserRequest{
    email?: boolean | number
    familyName?: boolean | number
    givenName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Account_possibleTypes: string[] = ['Account']
export const isAccount = (obj?: { __typename?: any } | null): obj is Account => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAccount"')
  return Account_possibleTypes.includes(obj.__typename)
}



const Budget_possibleTypes: string[] = ['Budget']
export const isBudget = (obj?: { __typename?: any } | null): obj is Budget => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBudget"')
  return Budget_possibleTypes.includes(obj.__typename)
}



const Event_possibleTypes: string[] = ['Event']
export const isEvent = (obj?: { __typename?: any } | null): obj is Event => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEvent"')
  return Event_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Transaction_possibleTypes: string[] = ['Transaction']
export const isTransaction = (obj?: { __typename?: any } | null): obj is Transaction => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTransaction"')
  return Transaction_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes: string[] = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}


export interface AccountPromiseChain{
    accountId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Has this account been closed? */
active: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface AccountObservableChain{
    accountId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Has this account been closed? */
active: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface BudgetPromiseChain{
    
/** Amount as a round number (smallest unit of the currency) */
amount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    categoryId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Date in ISO-8601 format (YYYY-MM-DD) */
date: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface BudgetObservableChain{
    
/** Amount as a round number (smallest unit of the currency) */
amount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    categoryId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Date in ISO-8601 format (YYYY-MM-DD) */
date: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface EventPromiseChain{
    data: ({get: (request?: boolean|number, defaultValue?: Scalars['JSON']) => Promise<Scalars['JSON']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    sequence: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    timestamp: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface EventObservableChain{
    data: ({get: (request?: boolean|number, defaultValue?: Scalars['JSON']) => Observable<Scalars['JSON']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    sequence: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    timestamp: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface MutationPromiseChain{
    addTransaction: ((args: {accountId: Scalars['String'],amount: Scalars['Int'],amountDir: AmountDir,categoryId?: (Scalars['String'] | null),currency: Scalars['String'],txId?: (Scalars['String'] | null),txInformation?: (Scalars['String'] | null),txReference?: (Scalars['String'] | null)}) => TransactionPromiseChain & {get: <R extends TransactionRequest>(request: R, defaultValue?: FieldsSelection<Transaction, R>) => Promise<FieldsSelection<Transaction, R>>}),
    closeAccount: ((args: {accountId: Scalars['String']}) => AccountPromiseChain & {get: <R extends AccountRequest>(request: R, defaultValue?: FieldsSelection<Account, R>) => Promise<FieldsSelection<Account, R>>}),
    createAccount: ((args: {name: Scalars['String']}) => AccountPromiseChain & {get: <R extends AccountRequest>(request: R, defaultValue?: FieldsSelection<Account, R>) => Promise<FieldsSelection<Account, R>>}),
    createUser: ((args: {authId: Scalars['String'],email: Scalars['String'],familyName: Scalars['String'],givenName: Scalars['String']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    updateAccount: ((args: {accountId: Scalars['String'],name: Scalars['String']}) => AccountPromiseChain & {get: <R extends AccountRequest>(request: R, defaultValue?: FieldsSelection<Account, R>) => Promise<FieldsSelection<Account, R>>}),
    updateUser: ((args?: {email?: (Scalars['String'] | null),familyName?: (Scalars['String'] | null),givenName?: (Scalars['String'] | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    upsertBudget: ((args: {amount: Scalars['Int'],categoryId: Scalars['String'],date: Scalars['String']}) => BudgetPromiseChain & {get: <R extends BudgetRequest>(request: R, defaultValue?: FieldsSelection<Budget, R>) => Promise<FieldsSelection<Budget, R>>})
}

export interface MutationObservableChain{
    addTransaction: ((args: {accountId: Scalars['String'],amount: Scalars['Int'],amountDir: AmountDir,categoryId?: (Scalars['String'] | null),currency: Scalars['String'],txId?: (Scalars['String'] | null),txInformation?: (Scalars['String'] | null),txReference?: (Scalars['String'] | null)}) => TransactionObservableChain & {get: <R extends TransactionRequest>(request: R, defaultValue?: FieldsSelection<Transaction, R>) => Observable<FieldsSelection<Transaction, R>>}),
    closeAccount: ((args: {accountId: Scalars['String']}) => AccountObservableChain & {get: <R extends AccountRequest>(request: R, defaultValue?: FieldsSelection<Account, R>) => Observable<FieldsSelection<Account, R>>}),
    createAccount: ((args: {name: Scalars['String']}) => AccountObservableChain & {get: <R extends AccountRequest>(request: R, defaultValue?: FieldsSelection<Account, R>) => Observable<FieldsSelection<Account, R>>}),
    createUser: ((args: {authId: Scalars['String'],email: Scalars['String'],familyName: Scalars['String'],givenName: Scalars['String']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    updateAccount: ((args: {accountId: Scalars['String'],name: Scalars['String']}) => AccountObservableChain & {get: <R extends AccountRequest>(request: R, defaultValue?: FieldsSelection<Account, R>) => Observable<FieldsSelection<Account, R>>}),
    updateUser: ((args?: {email?: (Scalars['String'] | null),familyName?: (Scalars['String'] | null),givenName?: (Scalars['String'] | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    upsertBudget: ((args: {amount: Scalars['Int'],categoryId: Scalars['String'],date: Scalars['String']}) => BudgetObservableChain & {get: <R extends BudgetRequest>(request: R, defaultValue?: FieldsSelection<Budget, R>) => Observable<FieldsSelection<Budget, R>>})
}

export interface QueryPromiseChain{
    accounts: ({get: <R extends AccountRequest>(request: R, defaultValue?: FieldsSelection<Account, R>[]) => Promise<FieldsSelection<Account, R>[]>}),
    budget: ((args: {date: Scalars['String']}) => {get: <R extends BudgetRequest>(request: R, defaultValue?: FieldsSelection<Budget, R>[]) => Promise<FieldsSelection<Budget, R>[]>}),
    events: ({get: <R extends EventRequest>(request: R, defaultValue?: FieldsSelection<Event, R>[]) => Promise<FieldsSelection<Event, R>[]>}),
    transactions: ((args: {accountId: Scalars['String']}) => {get: <R extends TransactionRequest>(request: R, defaultValue?: FieldsSelection<Transaction, R>[]) => Promise<FieldsSelection<Transaction, R>[]>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>})
}

export interface QueryObservableChain{
    accounts: ({get: <R extends AccountRequest>(request: R, defaultValue?: FieldsSelection<Account, R>[]) => Observable<FieldsSelection<Account, R>[]>}),
    budget: ((args: {date: Scalars['String']}) => {get: <R extends BudgetRequest>(request: R, defaultValue?: FieldsSelection<Budget, R>[]) => Observable<FieldsSelection<Budget, R>[]>}),
    events: ({get: <R extends EventRequest>(request: R, defaultValue?: FieldsSelection<Event, R>[]) => Observable<FieldsSelection<Event, R>[]>}),
    transactions: ((args: {accountId: Scalars['String']}) => {get: <R extends TransactionRequest>(request: R, defaultValue?: FieldsSelection<Transaction, R>[]) => Observable<FieldsSelection<Transaction, R>[]>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>})
}

export interface TransactionPromiseChain{
    accountId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** A number of monetary units */
amount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    
/** Supply "credit" or "debit" */
amountDir: ({get: (request?: boolean|number, defaultValue?: AmountDir) => Promise<AmountDir>}),
    categoryId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Currency code (ISO-4217) */
currency: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Unique identifier for the transaction within an servicing institution. */
txId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Further details of the transaction */
txInformation: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Unique reference for the transaction. This reference is optionally populated. */
txReference: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface TransactionObservableChain{
    accountId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** A number of monetary units */
amount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    
/** Supply "credit" or "debit" */
amountDir: ({get: (request?: boolean|number, defaultValue?: AmountDir) => Observable<AmountDir>}),
    categoryId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Currency code (ISO-4217) */
currency: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Unique identifier for the transaction within an servicing institution. */
txId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Further details of the transaction */
txInformation: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Unique reference for the transaction. This reference is optionally populated. */
txReference: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface UserPromiseChain{
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    familyName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    givenName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface UserObservableChain{
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    familyName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    givenName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}