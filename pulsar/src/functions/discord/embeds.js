const Discord = require('discord.js');

module.exports = {
  async createDefaultEmbed(description, options = {}) {
    const embed = new Discord.EmbedBuilder()
      .setDescription(description)
      .setColor('#D37506');

    if (options.fields) {
      embed.addFields(options.fields);
    }

    if (options.footer) {
      embed.setFooter(options.footer);
    }

    if (options.title) {
      embed.setTitle(options.title);
    }

    if (options.image) {
      embed.setImage(options.image);
    }

    if (options.thumbnail) {
      embed.setThumbnail(options.thumbnail);
    }

    if (options.interaction) {
      let replyOptions = {
        embeds: [embed],
        ephemeral: options.ephemeral
      };

      if (options.components) {
        replyOptions.components = options.components;
      }

      if (options.files) {
        replyOptions.files = options.files;
      }

      if (options.deferReply) {
        await options.interaction.editReply(replyOptions);
      } else if (options.followUp) {
        await options.interaction.followUp(replyOptions);
      } else {
        await options.interaction.reply(replyOptions);
      }
    } else if (options.message) {
      let sendOptions = {
        message: options.message
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (options.edit === true) {
        await options.message.edit({
          embeds: [embed],
          components: options.components
        });
      } else if (!options.edit) {
        await options.message.channel.send({
          embeds: [embed],
          components: options.components
        });
      }
    } else if (options.channel) {
      let sendOptions = {
        embeds: [embed]
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (!options.guild) {
        return console.error(
          new Error('[API] No guild specified for DEFAULTEMBED')
        );
      }

      const channel = await options.guild.channels.cache.get(options.channel);
      await channel.send(sendOptions);
    } else {
      return console.error(new Error('[API] Invalid event type'));
    }
  },

  async createEmbed(options = {}) {
    const embed = new Discord.EmbedBuilder().setColor(
      options.color || '#D37506'
    );

    if (options.title) {
      embed.setTitle(options.title);
    }

    if (options.description) {
      embed.setDescription(options.description);
    }

    if (options.fields) {
      embed.addFields(options.fields);
    }

    if (options.footer) {
      embed.setFooter(options.footer);
    }

    if (options.interaction) {
      let replyOptions = {
        embeds: [embed],
        ephemeral: options.ephemeral
      };

      if (options.components) {
        replyOptions.components = options.components;
      }

      if (options.deferReply) {
        await options.interaction.editReply(replyOptions);
      } else {
        await options.interaction.reply(replyOptions);
      }
    } else if (options.message) {
      let sendOptions = {
        message: options.message
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (options.edit === true) {
        await options.message.edit({
          embeds: [embed],
          components: options.components
        });
      } else if (!options.edit) {
        await options.message.channel.send({
          embeds: [embed],
          components: options.components
        });
      }
    } else if (options.channel) {
      let sendOptions = {
        embeds: [embed]
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (!options.guild) {
        return console.error(
          new Error('[API] No guild specified for WARNINGEMBED')
        );
      }

      const channel = await options.guild.channels.cache.get(options.channel);
      await channel.send(sendOptions);
    } else {
      return console.error(new Error('[API] Invalid event type'));
    }
  },

  async createErrorEmbed(type, description, options = {}) {
    const embed = new Discord.EmbedBuilder()
      .setTitle(type)
      .setDescription(description)
      .setColor('#FF0000');

    if (options.fields) {
      embed.addFields(options.fields);
    }

    if (options.footer) {
      embed.setFooter(options.footer);
    }

    if (options.interaction) {
      let replyOptions = {
        embeds: [embed],
        ephemeral: options.ephemeral
      };

      if (options.components) {
        replyOptions.components = options.components;
      }

      if (options.deferReply) {
        await options.interaction.editReply(replyOptions);
      } else {
        await options.interaction.reply(replyOptions);
      }
    } else if (options.message) {
      let sendOptions = {
        message: options.message
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (options.edit === true) {
        await options.message.edit({
          embeds: [embed],
          components: options.components
        });
      } else if (!options.edit) {
        await options.message.channel.send({
          embeds: [embed],
          components: options.components
        });
      }
    } else if (options.channel) {
      let sendOptions = {
        embeds: [embed]
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (!options.guild) {
        return console.error(
          new Error('[API] No guild specified for WARNINGEMBED')
        );
      }

      const channel = await options.guild.channels.cache.get(options.channel);
      await channel.send(sendOptions);
    } else {
      return console.error(new Error('[API] Invalid event type'));
    }
  },

  async createWarningEmbed(type, description, options = {}) {
    const embed = new Discord.EmbedBuilder()
      .setTitle(type)
      .setDescription(description)
      .setColor('#FFD700');

    if (options.fields) {
      embed.addFields(options.fields);
    }

    if (options.footer) {
      embed.setFooter(options.footer);
    }

    if (options.interaction) {
      let replyOptions = {
        embeds: [embed],
        ephemeral: options.ephemeral
      };

      if (options.components) {
        replyOptions.components = options.components;
      }

      if (options.deferReply) {
        await options.interaction.editReply(replyOptions);
      } else {
        await options.interaction.reply(replyOptions);
      }
    } else if (options.message) {
      let sendOptions = {
        message: options.message
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (options.edit === true) {
        await options.message.edit({
          embeds: [embed],
          components: options.components
        });
      } else if (!options.edit) {
        await options.message.channel.send({
          embeds: [embed],
          components: options.components
        });
      }
    } else if (options.channel) {
      let sendOptions = {
        embeds: [embed]
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (!options.guild) {
        return console.error(
          new Error('[API] No guild specified for WARNINGEMBED')
        );
      }

      const channel = await options.guild.channels.cache.get(options.channel);
      await channel.send(sendOptions);
    } else {
      return console.error(new Error('[API] Invalid event type'));
    }
  },

  async createSuccessEmbed(type, description, options = {}) {
    const embed = new Discord.EmbedBuilder()
      .setTitle(type)
      .setDescription(description)
      .setColor('#50C878');

    if (options.fields) {
      embed.addFields(options.fields);
    }

    if (options.footer) {
      embed.setFooter(options.footer);
    }

    if (options.interaction) {
      let replyOptions = {
        embeds: [embed],
        ephemeral: options.ephemeral
      };

      if (options.components) {
        replyOptions.components = options.components;
      }

      if (options.deferReply) {
        await options.interaction.editReply(replyOptions);
      } else {
        await options.interaction.reply(replyOptions);
      }
    } else if (options.message) {
      let sendOptions = {
        message: options.message
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (options.edit === true) {
        await options.message.edit({
          embeds: [embed],
          components: options.components
        });
      } else if (!options.edit) {
        await options.message.channel.send({
          embeds: [embed],
          components: options.components
        });
      }
    } else if (options.channel) {
      let sendOptions = {
        embeds: [embed]
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (!options.guild) {
        return console.error(
          new Error('[API] No guild specified for WARNINGEMBED')
        );
      }

      const channel = await options.guild.channels.cache.get(options.channel);
      await channel.send(sendOptions);
    } else {
      return console.error(new Error('[API] Invalid event type'));
    }
  },

  async createLogEmbed(options = {}) {
    const embed = new Discord.EmbedBuilder().setColor('#8B4513');

    if (options.title) {
      embed.setTitle(options.title);
    }

    if (options.fields) {
      embed.addFields(options.fields);
    }

    if (options.description) {
      embed.setDescription(options.description);
    }

    if (options.footer) {
      embed.setFooter(options.footer);
    }

    if (options.channel) {
      let sendOptions = {
        embeds: [embed]
      };

      if (options.components) {
        sendOptions.components = options.components;
      }

      if (!options.guild) {
        return console.error(
          new Error('[API] No guild specified for LOGEMBED')
        );
      }

      const channel = await options.guild.channels.cache.get(options.channel);
      await channel.send(sendOptions);
    }
  },

  async createForumThreadEmbed(options = {}) {
    const embed = new Discord.EmbedBuilder().setColor('#D37506');

    if (options.title) {
      embed.setTitle(options.title);
    }

    if (options.description) {
      embed.setDescription(options.description);
    }

    if (options.fields) {
      embed.addFields(options.fields);
    }

    if (options.footer) {
      embed.setFooter(options.footer);
    }

    if (options.components) {
      return {
        embeds: embed,
        components: options.components
      };
    }

    if (!options.guild) {
      return console.error(
        new Error('[API] No guild specified for FORUMTHREADEMBED')
      );
    }
  }
};
