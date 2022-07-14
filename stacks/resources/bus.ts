import { EventBus, StackContext } from '@serverless-stack/resources';

export function getEventBus({ stack }: StackContext) {
  return new EventBus(stack, 'EventBus', {
    rules: {
      ACCOUNT_CLOSED: {
        pattern: {
          source: ['budgie:ACCOUNT_CLOSED'],
          detailType: ['Account'],
        },
        targets: {
          accountClosed: 'functions/projections/account.accountClosed',
        },
      },
      ACCOUNT_CREATED: {
        pattern: {
          source: ['budgie:ACCOUNT_CREATED'],
          detailType: ['Account'],
        },
        targets: {
          accountCreated: 'functions/projections/account.accountCreated',
        },
      },
      ACCOUNT_UPDATED: {
        pattern: {
          source: ['budgie:ACCOUNT_UPDATED'],
          detailType: ['Account'],
        },
        targets: {
          accountUpdated: 'functions/projections/account.accountUpdated',
        },
      },
      // ACCOUNTS_RETRIEVED: {
      //   pattern: {
      //     source: ['budgie:ACCOUNTS_RETRIEVED'],
      //     detailType: ['Account'],
      //   },
      //   targets: {
      //     accountsRetrieved: 'functions/projections/account.accountsRetrieved',
      //   },
      // },

      // BUDGET_RETRIEVED: {
      //   pattern: {
      //     source: ['budgie:BUDGET_RETRIEVED'],
      //     detailType: ['Budget'],
      //   },
      //   targets: {
      //     budgetRetrieved: 'functions/projections/budget.budgetRetrieved',
      //   },
      // },
      BUDGET_UPDATED: {
        pattern: {
          source: ['budgie:BUDGET_UPDATED'],
          detailType: ['Budget'],
        },
        targets: {
          budgetUpdated: 'functions/projections/budget.budgetUpdated',
        },
      },

      CATEGORY_CREATED: {
        pattern: {
          source: ['budgie:CATEGORY_CREATED'],
          detailType: ['BudgetCategory'],
        },
        targets: {
          categoryCreated: 'functions/projections/category.categoryCreated',
        },
      },
      CATEGORY_DELETED: {
        pattern: {
          source: ['budgie:CATEGORY_DELETED'],
          detailType: ['BudgetCategory'],
        },
        targets: {
          categoryDeleted: 'functions/projections/category.categoryDeleted',
        },
      },
      CATEGORY_UPDATED: {
        pattern: {
          source: ['budgie:CATEGORY_UPDATED'],
          detailType: ['BudgetCategory'],
        },
        targets: {
          categoryUpdated: 'functions/projections/category.categoryUpdated',
        },
      },

      CATEGORY_GROUP_CREATED: {
        pattern: {
          source: ['budgie:CATEGORY_GROUP_CREATED'],
          detailType: ['BudgetCategoryGroup'],
        },
        targets: {
          categoryGroupCreated: 'functions/projections/category-group.categoryGroupCreated',
        },
      },
      CATEGORY_GROUP_DELETED: {
        pattern: {
          source: ['budgie:CATEGORY_GROUP_DELETED'],
          detailType: ['BudgetCategoryGroup'],
        },
        targets: {
          categoryGroupDeleted: 'functions/projections/category-group.categoryGroupDeleted',
        },
      },
      CATEGORY_GROUP_UPDATED: {
        pattern: {
          source: ['budgie:CATEGORY_GROUP_UPDATED'],
          detailType: ['BudgetCategoryGroup'],
        },
        targets: {
          categoryGroupUpdated: 'functions/projections/category-group.categoryGroupUpdated',
        },
      },

      TRANSACTION_ADDED: {
        pattern: {
          source: ['budgie:TRANSACTION_ADDED'],
          detailType: ['Ledger'],
        },
        targets: {
          transactionAdded: 'functions/projections/ledger.transactionAdded',
        },
      },
      // TRANSACTIONS_RETRIEVED: {
      //   pattern: {
      //     source: ['budgie:TRANSACTIONS_RETRIEVED'],
      //     detailType: ['Ledger'],
      //   },
      //   targets: {
      //     transactionsRetrieved: 'functions/projections/ledger.transactionsRetrieved',
      //   },
      // },

      USER_CREATED: {
        pattern: {
          source: ['budgie:USER_CREATED'],
          detailType: ['User'],
        },
        targets: {
          userCreated: 'functions/projections/user.userCreated',
        },
      },
      // USER_LOGGED_IN: {
      //   pattern: {
      //     source: ['budgie:USER_LOGGED_IN'],
      //     detailType: ['User'],
      //   },
      //   targets: {},
      // },
      // USER_LOGGED_OUT: {
      //   pattern: {
      //     source: ['budgie:USER_LOGGED_OUT'],
      //     detailType: ['User'],
      //   },
      //   targets: {},
      // },
      // USER_RETRIEVED: {
      //   pattern: {
      //     source: ['budgie:USER_RETRIEVED'],
      //     detailType: ['User'],
      //   },
      //   targets: {
      //     userRetrieved: 'functions/projections/user.userRetrieved',
      //   },
      // },
      USER_UPDATED: {
        pattern: {
          source: ['budgie:USER_UPDATED'],
          detailType: ['User'],
        },
        targets: {
          userUpdated: 'functions/projections/user.userUpdated',
        },
      },
    },
  });
}
