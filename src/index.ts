import { Server } from 'http';
import app from './app';
// TODO: configure logger and use instead of console.info

const PORT = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
  console.info(`Smartcar API server running on port ${PORT}`);
});