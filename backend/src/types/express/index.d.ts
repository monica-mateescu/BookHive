import { File } from 'formidable';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        name: string;
        lastName: string;
        image?: string | null;
        email: string;
        emailVerified: boolean;
        role: string[];
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      };

      image?: File;
    }
  }
}

export {};
