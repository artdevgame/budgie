import { EventBus, StackContext } from '@serverless-stack/resources';

export function getEventBus({ stack }: StackContext) {
  return new EventBus(stack, 'EventBus', {
    rules: {
      ACCOUNT_CLOSED: {
        pattern: {
          source: ['budgie'],
          detailType: ['ACCOUNT_CLOSED'],
        },
        targets: {
          accountClosed: 'functions/projections/account.accountClosed',
        },
      },
      ACCOUNT_CREATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['ACCOUNT_CREATED'],
        },
        targets: {
          accountCreated: 'functions/projections/account.accountCreated',
        },
      },
      ACCOUNT_UPDATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['ACCOUNT_UPDATED'],
        },
        targets: {
          accountUpdated: 'functions/projections/account.accountUpdated',
        },
      },
      // ACCOUNTS_RETRIEVED: {
      //   pattern: {
      //     source: ['budgie'],
      //     detailType: ['ACCOUNTS_RETRIEVED'],
      //   },
      //   targets: {
      //     accountsRetrieved: 'functions/projections/account.accountsRetrieved',
      //   },
      // },

      // BUDGET_RETRIEVED: {
      //   pattern: {
      //     source: ['budgie'],
      //     detailType: ['BUDGET_RETRIEVED'],
      //   },
      //   targets: {
      //     budgetRetrieved: 'functions/projections/budget.budgetRetrieved',
      //   },
      // },
      BUDGET_UPDATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['BUDGET_UPDATED'],
        },
        targets: {
          budgetUpdated: 'functions/projections/budget.budgetUpdated',
        },
      },

      CATEGORY_CREATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['CATEGORY_CREATED'],
        },
        targets: {
          categoryCreated: 'functions/projections/category.categoryCreated',
        },
      },
      CATEGORY_DELETED: {
        pattern: {
          source: ['budgie'],
          detailType: ['CATEGORY_DELETED'],
        },
        targets: {
          categoryDeleted: 'functions/projections/category.categoryDeleted',
        },
      },
      CATEGORY_UPDATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['CATEGORY_UPDATED'],
        },
        targets: {
          categoryUpdated: 'functions/projections/category.categoryUpdated',
        },
      },

      CATEGORY_GROUP_CREATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['CATEGORY_GROUP_CREATED'],
        },
        targets: {
          categoryGroupCreated: 'functions/projections/category-group.categoryGroupCreated',
        },
      },
      CATEGORY_GROUP_DELETED: {
        pattern: {
          source: ['budgie'],
          detailType: ['CATEGORY_GROUP_DELETED'],
        },
        targets: {
          categoryGroupDeleted: 'functions/projections/category-group.categoryGroupDeleted',
        },
      },
      CATEGORY_GROUP_UPDATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['CATEGORY_GROUP_UPDATED'],
        },
        targets: {
          categoryGroupUpdated: 'functions/projections/category-group.categoryGroupUpdated',
        },
      },

      TRANSACTION_ADDED: {
        pattern: {
          source: ['budgie'],
          detailType: ['TRANSACTION_ADDED'],
        },
        targets: {
          transactionAdded: 'functions/projections/ledger.transactionAdded',
        },
      },
      // TRANSACTIONS_RETRIEVED: {
      //   pattern: {
      //     source: ['budgie'],
      //     detailType: ['TRANSACTIONS_RETRIEVED'],
      //   },
      //   targets: {
      //     transactionsRetrieved: 'functions/projections/ledger.transactionsRetrieved',
      //   },
      // },

      USER_CREATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['USER_CREATED'],
        },
        targets: {
          userCreated: 'functions/projections/user.userCreated',
        },
      },
      // USER_LOGGED_IN: {
      //   pattern: {
      //     source: ['budgie'],
      //     detailType: ['USER_LOGGED_IN'],
      //   },
      //   targets: {},
      // },
      // USER_LOGGED_OUT: {
      //   pattern: {
      //     source: ['budgie'],
      //     detailType: ['USER_LOGGED_OUT'],
      //   },
      //   targets: {},
      // },
      // USER_RETRIEVED: {
      //   pattern: {
      //     source: ['budgie'],
      //     detailType: ['USER_RETRIEVED'],
      //   },
      //   targets: {
      //     userRetrieved: 'functions/projections/user.userRetrieved',
      //   },
      // },
      USER_UPDATED: {
        pattern: {
          source: ['budgie'],
          detailType: ['USER_UPDATED'],
        },
        targets: {
          userUpdated: 'functions/projections/user.userUpdated',
        },
      },
    },
  });
}
