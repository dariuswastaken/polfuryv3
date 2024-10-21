import path from 'node:path';
import * as utils from '../exports/utils.js';

const utilsManager = {
    createInstance: () => {
        return {
            time: utils.time,
            uniques: utils.uniques
        };
    },
};

export default utilsManager;
