import winston from 'npm:winston';
import path from 'node:path';
import { Loggings } from 'https://github.com/drylian/Loggings/blob/main/src/mod.ts';

const logger = new Loggings('Loggings');

const folder = 'logs';

export const createErrorHandler = async (): Promise<void> => {
    const winstonLogger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: path.join(folder, 'winston.log'),
                level: 'error'
            })
        ]
    });

    winstonLogger.info('Logger initialized');

    process.on('uncaughtException', (err: Error) => {
        logger.info(`[ERROR LOG] ${err}.red`);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
        logger.info(`[ERROR LOG] ` + promise + ' ' + reason + '.red');
        process.exit(1);
    });

    process.on('warning', (warning: unknown) => {
        logger.info(`[WARNING LOG] ${warning}.yellow`);
        return;
    });

    process.on('beforeExit', (code: number) => {
        logger.info('[SYSTEM] Exiting with code ' + code + '.red');
    });

    logger.info('[SYSTEM] Error handler deployed..green');
};
