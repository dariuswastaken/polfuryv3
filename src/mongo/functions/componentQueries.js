import { db } from '../../handlers/mongoConnectionHandler';

export const createComponent = async ({tip_, componentDiscordID, componentID }) => {
  await db.create('Component', {
    tip_: tip_,
    componentDiscordID: componentDiscordID,
    componentID: componentID,
    disabled: false
  });
};

export const getComponent = async (id) => {
  const result = await db.find('Component', { componentID: id });
  return result;
};

export const disableComponent = async (id) => {
  await db.update(
    'Component',
    { componentID: id },
    { $set: { disabled: true } }
  );
};
