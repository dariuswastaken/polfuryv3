module.exports = {
  async validateProfile(userID, mongo) {
    const profile = await mongo.getProfile(userID);
    if (!profile) return false;
    return true;
  },
};
