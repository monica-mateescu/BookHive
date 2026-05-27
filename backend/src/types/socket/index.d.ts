import 'socket.io';

declare module 'socket.io' {
  export interface Socket {
    data: {
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
    };
  }
}

export {};
