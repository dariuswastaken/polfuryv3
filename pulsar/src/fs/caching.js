import fs from 'fs';
import path from 'node:path';
import util from 'util';

module.exports = {
  createCacheManager: async () => {
    const date = new Date();
    let formattedDate = date
      .toLocaleString('de-DE', {
        timeZone: 'Europe/Berlin'
      })
      .replace(', ', '_');

    const cacheDir = '../../../.cache';

    if (!fs.existsSync(path.join(__dirname, cacheDir))) {
      fs.mkdirSync(path.join(__dirname, cacheDir));
    }

    const outPath = path.join(__dirname, cacheDir, `log-${formattedDate}.log`);
    const errPath = path.join(
      __dirname,
      cacheDir,
      `error-${formattedDate}.log`
    );

    const out = fs.createWriteStream(outPath);
    const err = fs.createWriteStream(errPath);

    console.log = function (msg) {
      const time = new Date();
      const formattedTimeAndDate = time
        .toLocaleString('de-DE', {
          timeZone: 'Europe/Berlin'
        })
        .replace(', ', ' ');

      if (typeof msg === 'object') {
        msg = util.inspect(msg);
      }

      out.write(`[${formattedTimeAndDate}] ${msg}\n`);
      process.stdout.write(`${msg}\n`);
    };

    console.error = function (msg) {
      const time = new Date();
      const formattedTimeAndDate = time
        .toLocaleString('de-DE', {
          timeZone: 'Europe/Berlin'
        })
        .replace(', ', ' ');

      if (typeof msg === 'object') {
        msg = util.inspect(msg);
      }

      err.write(`[${formattedTimeAndDate}] ${msg}\n`);
      process.stderr.write(`${msg}\n`);
    };
  }
};
