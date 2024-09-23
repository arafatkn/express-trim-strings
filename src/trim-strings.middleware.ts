import { isObjectLike } from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

/**
 * Trim white spaces from request body.
 */
@Middleware({ type: 'before', priority: 1000000 })
export class TrimStringsMiddleware implements ExpressMiddlewareInterface {
  protected excepts: string[] = [];

  getExceptedKeys(): string[] {
    return this.excepts;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const isJson = req.header('Content-Type')?.includes('application/json');

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && isJson) {
      req.body = this.trimStrings(req.body, this.getExceptedKeys());
    }

    next();
  }

  trimStrings(
    body: Record<string, any> | any[] | string | number,
    excepts: string[] = []
  ): Record<string, any> | any[] | string | number {
    if (!body || typeof body === 'number') {
      return body;
    }

    if (typeof body === 'string') {
      return body.trim();
    }

    if (Array.isArray(body)) {
      return body.map((item) => this.trimStrings(item, excepts));
    }

    if (isObjectLike(body)) {
      for (const [key, value] of Object.entries(body)) {
        if (excepts.includes(key)) continue;

        if (typeof value === 'string') {
          body[key] = value.trim();
        } else if (isObjectLike(value)) {
          body[key] = this.trimStrings(
            value,
            excepts.filter((e) => e.startsWith(`${key}.`)).map((e) => e.substring(e.indexOf('.') + 1))
          );
        }
      }
    }

    return body;
  }
}
