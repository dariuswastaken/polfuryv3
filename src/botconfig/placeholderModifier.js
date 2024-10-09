module.exports = {
  replacePlaceholder: function (str, placeholders) {
    return str.replace(/%([^%]+)%/g, (match, p1) => placeholders[p1] || match);
  },
  
  replaceButtonPlaceholders: (buttons, placeholders) => {
    return buttons.map(button => {
      return {
        id: module.exports.replacePlaceholder(button.id, placeholders),
        style: button.style,
        label: button.label
      };
    }); 
  }
}