export const buttons = [
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
];

export const loopButtons = [
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
];