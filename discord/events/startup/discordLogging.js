export default {
    name: 'discordLogging',
    async execute(Pulsar) {
        Pulsar.client.on('ready', async () => {
            const logsChannel = Pulsar.client.channels.cache.get('1305336008774127729');
            const errorChannel = Pulsar.client.channels.cache.get('1305335975693647882');

            const time = new Date();
            const formattedTimeAndDate = time
                .toLocaleString('de-DE', {
                    timeZone: 'Europe/Berlin'
                })
                .replace(', ', ' ');

            logsChannel.send(`[INFO] Restart at ${formattedTimeAndDate}`);
            errorChannel.send(`[INFO] Restart at ${formattedTimeAndDate}`);

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

                logsChannel.send(`[${formattedTimeAndDate}] ${msg}`);
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

                errorChannel.send(`[${formattedTimeAndDate}] ${msg}`);
            };
        });
    }
};
