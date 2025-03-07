import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createLogsManager = async (): Promise<void> => {
    const date = new Date();
    let formattedDate = date
        .toLocaleString('de-DE', {
            timeZone: 'Europe/Berlin'
        })
        .replace(', ', '_');

    const logsDir = '../../../logs';

    if (!fs.existsSync(path.join(__dirname, logsDir))) {
        fs.mkdirSync(path.join(__dirname, logsDir));
    }

    /*const outPath = path.join(__dirname, logsDir, `log-${formattedDate}.log`);
    const errPath = path.join(__dirname, logsDir, `error-${formattedDate}.log`);

    const out = fs.createWriteStream(outPath);
    const err = fs.createWriteStream(errPath);*/
};
