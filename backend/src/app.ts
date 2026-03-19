import '#db';
import express from 'express';
import cors from 'cors';
import { CLIENT_BASE_URL } from '#config';
import { notFoundHandler, errorHandler } from '#middlewares';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: CLIENT_BASE_URL,
    credentials: true
  })
);
app.use(express.json());

app.get('/', (req, res) => res.send('BookHive Backend is running!'));

app.use('/*splat', notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
