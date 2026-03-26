import '#db';
import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { CLIENT_BASE_URL } from '#config';
import { notFoundHandler, errorHandler } from '#middlewares';
import { auth } from '#utils';
import { authRouter, bookRouter } from '#routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use('/api', authRouter);

app.use(express.json());

app.use('/api/books', bookRouter);

app.use('/*splat', notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
