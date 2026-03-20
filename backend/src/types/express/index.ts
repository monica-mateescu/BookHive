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
        role: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

export {};
