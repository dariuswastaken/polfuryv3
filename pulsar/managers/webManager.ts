import * as webFunctions from '../exports/web.ts';
import { Manager } from '../interfaces/base/managers.interfaces.ts';
import { WebInstance } from '../interfaces/managerInterfaces/webManager.interfaces.ts';

const webManager: Manager<Object> = {
    createInstance: (): WebInstance => {
        return {
            getUserMdtData: webFunctions.getUserMdtData,
            isOnDuty: webFunctions.isOnDuty,
            getUserServerProfile: webFunctions.getUserServerProfile,
        };
    }
};

export default webManager;
