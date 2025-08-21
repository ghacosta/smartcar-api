import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import vehiclesRouter from './routes/vehicles';
import logger from './config/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import rateLimit from 'express-rate-limit';

const app: Application = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 mins
  max: 100,                //100 max num of connection per window
  message: {
    error: 'Too Many Requests',
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Welcome to Smartcar API', timestamp: new Date().toISOString() });
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
app.use(notFoundHandler);
app.use(errorHandler);

export default app;