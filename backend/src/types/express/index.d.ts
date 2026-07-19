import { IAdmin } from '../models/Admin';

declare global {
  namespace Express {
    interface Request {
      user?: IAdmin;
    }
  }
}
