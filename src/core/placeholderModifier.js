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

export const replaceEmbedPlaceholders = (embed, placeholders) => {
  return {
    description: replacePlaceholder(embed.description, placeholders),
    base: {
      title: replacePlaceholder(embed.base.title, placeholders),
      interaction: replacePlaceholder(embed.base.interaction, placeholders),
      components: replacePlaceholder(embed.base.components, placeholders),
      ephemeral: embed.base.ephemeral,
      deferReply: embed.base.deferReply
    },
    fields: embed.fields
      ? embed.fields.map((field) => ({
          name: replacePlaceholder(field.name, placeholders),
          value: replacePlaceholder(field.value, placeholders)
        }))
      : undefined
  };
};
