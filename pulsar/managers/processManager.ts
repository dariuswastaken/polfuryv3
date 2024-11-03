import * as processFunctions from '../exports/process.js';
import { Manager } from '../interfaces/base/managers.interfaces.js';
import { ProcessInstance } from '../interfaces/managerInterfaces/processManager.interfaces.js';

const processManager: Manager<Object> = {
    createInstance: (): ProcessInstance  => {
        return {
            createErrorHandler: processFunctions.createErrorHandler
        };
    }
};

export default processManager;
