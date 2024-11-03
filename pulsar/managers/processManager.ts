import * as processFunctions from '../exports/process.ts';
import { Manager } from '../interfaces/base/managers.interfaces.ts';
import { ProcessInstance } from '../interfaces/managerInterfaces/processManager.interfaces.ts';

const processManager: Manager<Object> = {
    createInstance: (): ProcessInstance  => {
        return {
            createErrorHandler: processFunctions.createErrorHandler
        };
    }
};

export default processManager;
