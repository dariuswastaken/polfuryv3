module.exports = {
  subdepMenu: {
    loopedButton: [
      {
        id: `%subdep%-menu`,
        style: 'Secondary',
        label: `🛠️ %subdep-reg%`
      }
    ]
  },
  subdepSubMenu: {
    buttons: [
      {
        id: `%type%-menu-instructori`,
        style: 'Secondary',
        label: '📋 Instructori'
      },
      {
        id: `%type%-menu-aplicatii`,
        style: 'Secondary',
        label: '🗒️ Meniu Aplicatii',
        disabled: true
      },
      {
        id: `%type%-menu-add-instr`,
        style: 'Success',
        label: '➕ Adauga Instructori'
      },
      {
        id: `%type%-menu-remove-instr`,
        style: 'Danger',
        label: '➖ Scoate Instructori'
      }
    ]
  }
};
