import { db } from '../../handlers/mongoConnectionHandler';

module.exports = {
  createComponent: async ({ tip_, componentDiscordID, componentID }) => {
    await db.create('Component', {
      tip_: tip_,
      componentDiscordID: componentDiscordID,
      componentID: componentID,
      disabled: false
    });
  },

  getComponent: async (id) => {
    const result = await db.find('Component', { componentID: id });
    return result;
  },

  disableComponent: async (id) => {
    await db.update(
      'Component',
      { componentID: id },
      { $set: { disabled: true } }
    );
  },
}