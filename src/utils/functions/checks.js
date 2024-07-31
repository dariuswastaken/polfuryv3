module.exports = {
  validateTwoArguments(input) {
    let args = input.split(' ');
    return args.length >= 2;
  }
};
