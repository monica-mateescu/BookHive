import '#db';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { CLIENT_BASE_URL } from '#config';
import { notFoundHandler, errorHandler, socketAuthMiddleware } from '#middlewares';
import { auth } from '#utils';
import { authRouter, bookRouter, chatRouter, clubRouter, usersRouter } from '#routes';
import { handleSocketConnection } from '#controllers';

const app = express();

app.set('trust proxy', 1);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [CLIENT_BASE_URL],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.use(socketAuthMiddleware);
handleSocketConnection(io);

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use('/api', authRouter);

app.use('/api/books', bookRouter);
app.use('/api/clubs', clubRouter);
app.use('/api/users', usersRouter);
app.use('/api/chat', chatRouter);

app.use('/*splat', notFoundHandler);
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
