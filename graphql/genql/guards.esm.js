
var Account_possibleTypes = ['Account']
export var isAccount = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAccount"')
  return Account_possibleTypes.includes(obj.__typename)
}



var Budget_possibleTypes = ['Budget']
export var isBudget = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBudget"')
  return Budget_possibleTypes.includes(obj.__typename)
}



var Event_possibleTypes = ['Event']
export var isEvent = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEvent"')
  return Event_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Transaction_possibleTypes = ['Transaction']
export var isTransaction = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTransaction"')
  return Transaction_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
export var isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}
