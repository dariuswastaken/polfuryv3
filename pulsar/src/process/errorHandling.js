import winston from 'npm:winston';
import path from 'node:path';

const folder = 'logs';

export const createErrorHandler = async () => {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(folder, 'winston.log'),
          level: 'error'
        })
      ]
    });

    logger.info('Logger initialized');

    process.on('uncaughtException', (err) => {
      console.log('[ERROR LOG] ' + err.stack);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.log('[ERROR LOG] ' + promise + ' ' + reason);
      process.exit(1);
    });

    process.on('warning', (warning) => {
      console.warn('[WARNING LOG] ' + warning);
      return;
    });

    process.on('beforeExit', (code) => {
      console.log('[SYSTEM] Exiting with code ' + code);
    });

    console.log('[SYSTEM] Error handler deployed.');
  }
};
