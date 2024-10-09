const botconfig = require('../../src/botconfig/botconfig.js');

describe('botconfig', () => {
  it('should export an object', () => {
    expect(botconfig).toBeInstanceOf(Object);
    expect(botconfig).not.toBe(null);
  });
  
  it('should have the following properties', () => {
    expect(botconfig).toHaveProperty('activityListMenusButtons');
    expect(botconfig).toHaveProperty('demiterePendingMenus');
  })
});