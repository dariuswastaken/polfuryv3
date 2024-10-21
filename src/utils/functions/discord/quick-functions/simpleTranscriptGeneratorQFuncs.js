export const createChannelTranscript = async ({ interaction, channelID, type }) => {
    const channel = await interaction.guild.channels.cache.get(channelID);
    let messages = await channel.messages.fetch({ limit: 100 });
    let sortedMessages = Array.from(messages.values()).sort(
        (a, b) => a.createdTimestamp - b.createdTimestamp
    );

    let transcriptHTML = `
        <html>
        <head>
            <title>Transcript ${type}</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #36393f; color: #dcddde; }
                .message { margin-bottom: 1em; }
                .timestamp { color: #72767d; font-size: 0.8em; }
                .username { color: #b9bbbe; font-weight: bold; }
                .content { color: #dcddde; }
                .avatar { border-radius: 50%; width: 32px; height: 32px; }
                .role { color: #b9bbbe; font-size: 0.8em; }
            </style>
        </head>
        <body>
            ${sortedMessages
                .map(
                    (message) => `
                <div class="message">
                    <img class="avatar" src="${message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true
                    })}" alt="${message.author.username}/userAvatar">
                    <span class="timestamp">${new Date(message.createdTimestamp).toLocaleString(
                        'ro-RO',
                        {
                            timeZone: 'Europe/Bucharest'
                        }
                    )}</span>
                    <span class="username">${message.author.username}</span>
                    <p class="content">${message.cleanContent}</p>
                </div>
            `
                )
                .join('')}
        </body>
        </html>
        `;

    const encoder = new TextEncoder();
    const transcript = encoder.encode(transcriptHTML);

    return transcript;
};
