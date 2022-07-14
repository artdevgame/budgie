const DUMMY_RESOLVER = { serialize: x => x, parseValue: x => x }; 
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
var builder = new SchemaBuilder({
    plugins: [PrismaPlugin],
    prisma: { client: prisma }
});
builder.scalarType('DateTime', DUMMY_RESOLVER);
builder.scalarType('JSON', DUMMY_RESOLVER);
var AccountType = builder.objectRef('Account').implement({
    fields: t => ({
        accountId: t.exposeString('accountId'),
        name: t.exposeString('name'),
        active: t.exposeBoolean('active', { description: 'Has this account been closed?' })
    })
});
builder.queryFields(fieldBuilder => ({ accounts: getAccounts(fieldBuilder) }));
builder.mutationFields(fieldBuilder => ({
    createAccount: createAccount(fieldBuilder),
    updateAccount: updateAccount(fieldBuilder),
    closeAccount: closeAccount(fieldBuilder)
}));
var BudgetType = builder.objectRef('Budget').implement({
    fields: t => ({
        categoryId: t.exposeString('categoryId'),
        date: t.exposeString('date', { description: 'Date in ISO-8601 format (YYYY-MM-DD)' }),
        amount: t.exposeInt('amount', { description: 'Amount as a round number (smallest unit of the currency)' })
    })
});
builder.queryFields(fieldBuilder => ({ budget: getBudget(fieldBuilder) }));
builder.mutationFields(fieldBuilder => ({ upsertBudget: upsertBudget(fieldBuilder) }));
builder.prismaObject('Event', {
    name: 'Event',
    fields: t => ({
        id: t.exposeID('id'),
        data: t.expose('data', { type: 'JSON' }),
        sequence: t.exposeInt('sequence'),
        timestamp: t.expose('timestamp', { type: 'DateTime' }),
        version: t.exposeString('version')
    })
});
var AmountDir = builder.enumType('AmountDir', {
    values: [
        'credit',
        'debit'
    ]
});
var TransactionType = builder.objectRef('Transaction').implement({
    fields: t => ({
        accountId: t.exposeString('accountId'),
        categoryId: t.exposeString('categoryId'),
        txId: t.exposeString('txId', { description: 'Unique identifier for the transaction within an servicing institution.' }),
        txReference: t.exposeString('txReference', { description: 'Unique reference for the transaction. This reference is optionally populated.' }),
        txInformation: t.exposeString('txInformation', { description: 'Further details of the transaction' }),
        amount: t.exposeInt('amount', { description: 'A number of monetary units' }),
        currency: t.exposeString('currency', { description: 'Currency code (ISO-4217)' }),
        amountDir: t.expose('amountDir', {
            type: AmountDir,
            description: 'Supply "credit" or "debit"'
        })
    })
});
builder.queryFields(fieldBuilder => ({ transactions: getTransactions(fieldBuilder) }));
builder.mutationFields(fieldBuilder => ({ addTransaction: addTransaction(fieldBuilder) }));
var UserType = builder.objectRef('Account').implement({
    fields: t => ({
        email: t.exposeString('email'),
        familyName: t.exposeString('familyName'),
        givenName: t.exposeString('givenName')
    })
});
builder.queryFields(fieldBuilder => ({ user: getUser(fieldBuilder) }));
builder.mutationFields(fieldBuilder => ({
    createUser: createUser(fieldBuilder),
    updateUser: updateUser(fieldBuilder)
}));
var schema = builder.toSchema({});
export {
    schema
};