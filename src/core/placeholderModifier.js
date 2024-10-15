export const replacePlaceholder = (str, placeholders) => {
    return str.replace(/%([^%]+)%/g, (match, p1) => placeholders[p1] || match);
}

export const replaceButtonPlaceholders = (buttons, placeholders) => {
    return buttons.map(button => {
      return {
        id: replacePlaceholder(button.id, placeholders),
        style: button.style,
        label: replacePlaceholder(button.label, placeholders),
        disabled: button.disabled || false
      };
    }); 
}