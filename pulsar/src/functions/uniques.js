export const createUniqueID = async () => {
  const timestamp = new Date().getTime();
  const minRandom = 100000;
  const maxRandom = 9999999;

  const keyLength = Math.floor(Math.random() * 5) + 20;
  const key =
    Math.floor(Math.random() * (maxRandom - minRandom + 1)) + minRandom;

  const uniqueID = `${timestamp}${key}`.slice(0, keyLength);

  return uniqueID;
};

export const generateToken = async (length, tip) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const epoch = new Date().getTime();

  return `polxto_${token}_${epoch}_${tip}`;
};
