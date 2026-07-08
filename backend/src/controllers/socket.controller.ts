import { clubService, messageService } from '#services';
import { Server, Socket } from 'socket.io';
import { messageInputSchema, joinClubSchema } from '#schemas';

const MIN_MS_BETWEEN_MESSAGES = 1000;
const lastMessageAt = new Map<string, number>();

const genericError = (context: string, err: unknown) => {
  console.error(context, err);
  return 'Something went wrong. Please try again.';
};

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', async (payload, callback) => {
      try {
        const { data, error, success } = joinClubSchema.safeParse(payload);

        if (!success) {
          return callback?.({ success: false, error: error.issues[0]?.message ?? 'Invalid request' });
        }

        const { clubId } = data;
        const userId = socket.data.user.id;

        const isMember = await clubService.isMember(clubId.toString(), userId);

        if (!isMember) {
          return callback?.({ success: false, error: 'You are not a member of this club' });
        }

        socket.join(clubId.toString());
        console.log(`${userId} joined club chat: ${clubId}`);

        callback?.({ success: true });
      } catch (err) {
        callback?.({ success: false, error: genericError('Error handling join event:', err) });
      }
    });

    socket.on('message', async (payload, callback) => {
      try {
        const { data, error, success } = messageInputSchema.safeParse(payload);

        if (!success) {
          return callback?.({ success: false, error: error.issues[0]?.message ?? 'Invalid message' });
        }

        const { text, clubId } = data;
        const clubRoom = clubId.toString();
        const senderId = socket.data.user.id;

        if (!socket.rooms.has(clubRoom)) {
          return callback?.({ success: false, error: 'You must join this club chat before sending messages' });
        }

        const now = Date.now();
        const last = lastMessageAt.get(socket.id) ?? 0;

        if (now - last < MIN_MS_BETWEEN_MESSAGES) {
          return callback?.({ success: false, error: 'You are sending messages too quickly' });
        }

        lastMessageAt.set(socket.id, now);

        const message = await messageService.createMessage(clubId, senderId, text);

        callback?.({ success: true });

        io.to(clubRoom).emit('message', message);
      } catch (err) {
        callback?.({ success: false, error: genericError('Error handling message event:', err) });
      }
    });

    socket.on('disconnect', () => {
      lastMessageAt.delete(socket.id);
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
