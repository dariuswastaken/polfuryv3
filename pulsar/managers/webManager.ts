import * as webFunctions from '../exports/web.js';
import { Manager } from '../interfaces/base/managers.interfaces.js';
import { WebInstance } from '../interfaces/managerInterfaces/webManager.interfaces.js';

const webManager: Manager<Object> = {
    createInstance: (): WebInstance => {
        return {
            getUserMdtData: webFunctions.getUserMdtData,
            isOnDuty: webFunctions.isOnDuty,
            getUserServerProfile: webFunctions.getUserServerProfile,
            resetMDT: webFunctions.resetMDT
        };
    }
};

export default webManager;
