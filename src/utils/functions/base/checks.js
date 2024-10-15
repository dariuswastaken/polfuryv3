export const validateTwoArguments = async (input) => {
  let args = input.split(' ');
  return args.length >= 2;
};
