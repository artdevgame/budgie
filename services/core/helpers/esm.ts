// @ts-nocheck

// work around for Prisma (& maybe others) that requires __dirname to be set in esm
// ERROR Runtime.UnhandledPromiseRejection: ReferenceError: __dirname is not defined in ES module scope

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__filename = __filename;
global.__dirname = __dirname;

globalThis.__filename = __filename;
globalThis.__dirname = __dirname;
if (this) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.__filename = __filename;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.__dirname = __dirname;
}
