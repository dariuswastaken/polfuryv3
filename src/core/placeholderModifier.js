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
  
  const embedObj = Object.assign(
    {
      description: await replacePlaceholder(embed.description, placeholders),
      base: {
        title: await replacePlaceholder(embed.base.title, placeholders),
        interaction: await replacePlaceholder(embed.base.interaction, placeholders),
        components: await replacePlaceholder(embed.base.components, placeholders),
        ephemeral: embed.base.ephemeral,
        deferReply: embed.base.deferReply
      }
    },
    embed.fields
      ? {
          fields: embed.fields.map((field) => ({
            name: replacePlaceholder(field.name, placeholders),
            value: replacePlaceholder(field.value, placeholders)
          }))
        }
      : {}
  );
  return embedObj;
};
