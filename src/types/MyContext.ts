import { Request, Response } from 'express';

import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export interface MyContext {
  req: Request;
  res: Response;
}
