export const replacePlaceholder = (str, placeholders) => {
  return str.replace(/%([^%]+)%/g, (match, p1) => placeholders[p1] || match);
};

export const replaceButtonPlaceholders = (buttons, placeholders) => {
  return buttons.map((button) => {
    return {
      id: replacePlaceholder(button.id, placeholders),
      style: button.style,
      label: replacePlaceholder(button.label, placeholders),
      disabled: button.disabled || false
    };
  });
};

export const replaceEmbedPlaceholders = async (embed, placeholders) => {
  const handlePlaceholder = async (value) => {
    if (value === '%interaction%') {
      return JSON.stringify(placeholders.interaction);
    }

    return await replacePlaceholder(value, placeholders);
  };

  const embedObj = Object.assign(
    {
      description: await handlePlaceholder(embed.description),
      base: {
        title: await handlePlaceholder(embed.base.title),
        interaction: await handlePlaceholder(embed.base.interaction),
        components: await handlePlaceholder(embed.base.components),
        ephemeral: embed.base.ephemeral,
        deferReply: embed.base.deferReply
      }
    },
    embed.fields
      ? {
          fields: await Promise.all(
            embed.fields.map(async (field) => ({
              name: await handlePlaceholder(field.name),
              value: await handlePlaceholder(field.value)
            }))
          )
        }
      : {}
  );

  return embedObj;
};
