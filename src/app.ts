import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import vehiclesRouter from './routes/vehicles';

const app: Application = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Welcome to Smartcar API'});
});

app.use('/vehicles', vehiclesRouter);

export default app;