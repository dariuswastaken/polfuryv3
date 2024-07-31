module.exports = {
  async hasRole(member, role) {
    if (member.roles.cache.some((r) => r.name === role)) return true;
  },

  async addRole(member, role) {
    if (!member.roles.cache.some((r) => r.name === role)) {
      member.roles.add(role);
    } else {
      return 'User already has this role';
    }
  },

  async removeRole(member, role) {
    if (member.roles.cache.some((r) => r.name === role)) {
      member.roles.remove(role);
    } else {
      return 'User does not have this role';
    }
  },
  
  async hasRoles(member, roles) {
    let hasRoles = true;

    roles.forEach((role) => {
      if (!member.roles.cache.some((r) => r.id === role)) hasRoles = false;
    });

    return hasRoles;
  }
};
