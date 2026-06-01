import { clubService, messageService } from '#services';
import { Server, Socket } from 'socket.io';
import { messageInputSchema } from '#schemas';
import { z } from 'zod';

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', async ({ clubId }, callback) => {
      const userId = socket.data.user.id;

      const isMember = await clubService.isMember(clubId, userId);

      if (!isMember) {
        return callback?.({
          success: false,
          error: 'You are not a member of this club'
        });
      }

      socket.join(clubId);
      console.log(`${userId} joined club chat: ${clubId}`);
    });

    socket.on('message', async (payload, callback) => {
      const { data, error, success } = messageInputSchema.safeParse(payload);

      if (!success) {
        return callback?.({
          success: false,
          error: z.prettifyError(error)
        });
      }

      const { text, clubId } = data;

      const senderId = socket.data.user.id;

      const message = await messageService.createMessage(clubId.toString(), senderId, text);

      io.to(clubId.toString()).emit('message', message);

      callback?.(null, {
        success: true
      });
    });

    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
