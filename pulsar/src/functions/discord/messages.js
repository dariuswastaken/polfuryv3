module.exports = {
  async handleDelete(message) {
    try {
      await message.delete();
    } catch (e) {
      console.log(e);
    }
  }
};
