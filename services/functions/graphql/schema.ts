import './types/account';
import './types/budget';
import './types/event';
import './types/ledger';
import './types/user';

import { builder } from './builder';

export const schema = builder.toSchema({});
