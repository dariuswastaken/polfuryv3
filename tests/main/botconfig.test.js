const botconfig = require('../../src/botconfig/botconfig.js');

describe('botconfig', () => {
  it('should export an object', () => {
    expect(botconfig).toBe('object');
    expect(botconfig).not.toBe(null);
  });
});