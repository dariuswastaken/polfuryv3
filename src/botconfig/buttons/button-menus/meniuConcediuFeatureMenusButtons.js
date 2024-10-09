module.exports = {
  buttons: [
    {
      id: `concediu/%targetid%/all`,
      style: 'Secondary',
      label: '➕ Toata Saptamana'
    },
    {
      id: `adaugare-motiv-concediu/%targetid%`,
      style: 'Secondary',
      label: '🗒️ Adaugare Motiv'
    }
  ],
  loopButtons: [
    {
      dayIsChecked: [
        {
          id: `concediu/%targetid%/%day%`,
          style: 'Danger',
          label: `📅 %day%`,
          disabled: true
        }
      ],
      dayNotChecked: [
        {
          id: `concediu/%targetid%/%day%`,
          style: 'Success',
          label: `📅 %day%`
        }
      ]
    }
  ]
};
