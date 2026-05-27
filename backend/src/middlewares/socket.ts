import { auth } from '#utils';
import { fromNodeHeaders } from 'better-auth/node';
import type { Socket } from 'socket.io';

export async function socketAuthMiddleware(socket: Socket, next: Function) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(socket.handshake.headers) });

  if (!session) {
    return next(new Error('Unauthorized', { cause: { status: 401 } }));
  }

  socket.data.user = session.user;

  next();
}
