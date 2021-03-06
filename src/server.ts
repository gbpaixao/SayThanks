import express, { Request, Response } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';

import './database';
import { router } from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => res.send('Api rodando!'));

app.use(router);

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3000, () => console.log('Server is running!'));
