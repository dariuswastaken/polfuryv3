import winston from 'npm:winston';
import path from 'node:path';

const folder = 'logs';

export const createErrorHandler = async (): Promise<void> => {
    const logger = winston.createLogger({
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

    logger.info('Logger initialized');

    process.on('uncaughtException', (err: Error) => {
        console.log('[ERROR LOG] ' + err.stack);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
        console.log('[ERROR LOG] ' + promise + ' ' + reason);
        process.exit(1);
    });

    process.on('warning', (warning: unknown) => {
        console.warn('[WARNING LOG] ' + warning);
        return;
    });

    process.on('beforeExit', (code: number) => {
        console.log('[SYSTEM] Exiting with code ' + code);
    });

    console.log('[SYSTEM] Error handler deployed.');
};
