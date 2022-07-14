type TAccountEventName = 'ACCOUNT_CLOSED' | 'ACCOUNT_CREATED' | 'ACCOUNT_UPDATED';

type TBudgetEventName = 'BUDGET_UPDATED';

type TCategoryEventName = 'CATEGORY_CREATED' | 'CATEGORY_DELETED' | 'CATEGORY_UPDATED';

type TCategoryGroupEventName = 'CATEGORY_GROUP_CREATED' | 'CATEGORY_GROUP_DELETED' | 'CATEGORY_GROUP_UPDATED';

type TLedgerEventName = 'TRANSACTION_ADDED' | 'TRANSACTIONS_RETRIEVED';

type TUserEventName = 'USER_CREATED' | 'USER_UPDATED';

export type TEventName =
  | TAccountEventName
  | TBudgetEventName
  | TCategoryEventName
  | TCategoryGroupEventName
  | TLedgerEventName
  | TUserEventName;
