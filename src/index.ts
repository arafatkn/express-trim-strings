// Middleware to use with routing-controllers.
import { TrimStringsMiddleware } from './trim-strings.middleware';

// Middleware to use with express directly.
const trimStrings = new TrimStringsMiddleware().use;

export { TrimStringsMiddleware, trimStrings };
