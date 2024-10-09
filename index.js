const { init } = require('./src/core/init.js');

const dotenv = require('dotenv');
dotenv.config();

const placeHolderModifier = require('./src/botconfig/placeholderModifier.js');
const buttons = [
  {
    id: `menu-demitere/confirm/%targetid%/%uid%`,
    style: 'Danger',
    label: '✅ Confirmare'
  },
  {
    id: `menu-demitere/cancel/%targetid%/%uid%`,
    style: 'Secondary',
    label: '❌ Anulare'
  }
]

const newbuttons = placeHolderModifier.replaceButtonPlaceholders(buttons, { targetid: '123', uid: '456' });

console.log(newbuttons);

init();
