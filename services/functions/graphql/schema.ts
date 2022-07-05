import { builder } from "./builder";

import "./types/account";
import "./types/auth";
import "./types/budget";
import "./types/event";
import "./types/ledger";

export const schema = builder.toSchema({});
