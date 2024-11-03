import path from 'node:path';
import * as utils from '../exports/utils.js';
import { Manager } from '../interfaces/base/managers.interfaces.ts';
import { UtilsInstance } from '../interfaces/managerInterfaces/utilsManager.interfaces.ts';

const utilsManager: Manager<Object> = {
    createInstance: (): UtilsInstance => {
        return {
            time: utils.time,
            uniques: utils.uniques
        };
    }
};

export default utilsManager;
