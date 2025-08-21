import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import vehiclesRouter from './routes/vehicles';
import logger from './config/logger';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Welcome to Smartcar API'});
});

app.use((req: Request, res: Response, next) => {
  logger.info('Request received', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
});


app.use('/vehicles', vehiclesRouter);
app.use(errorHandler);

export default app;