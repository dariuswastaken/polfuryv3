module.exports = {
  timeConversion: require('../../utils/functions/timeConversion'),
  dayConversion: require('../../utils/functions/dayConversion'),
  math: require('../../utils/functions/math'),
  checks: require('../../utils/functions/checks'),
  discord: {
    embeds: require('../../utils/functions/discord/embeds'),
    errors: require('../../utils/functions/discord/errors'),
    selectMenus: require('../../utils/functions/discord/selectMenus'),
    buttonMenus: require('../../utils/functions/discord/buttonMenus'),
    modals: require('../../utils/functions/discord/modals'),
    cmds: require('../../utils/functions/discord/cmds'),
    validate: require('../../utils/functions/discord/validators'),
    logging: require('../../utils/functions/discord/logging'),
    roles: require('../../utils/functions/discord/roles')
  },
  algorithms: require('../../utils/functions/algorithms/algos'),
  activity: {
    utils: require('../functions/activity/utils')
  },
  quickFunctions: require('../functions/discord/quickFuncs')
};
