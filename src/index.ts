import { Server } from 'http';
import app from './app';
import logger from './config/logger';

const PORT = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
  logger.info(`Smartcar API server running on port ${PORT}`);
});