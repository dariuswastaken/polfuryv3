import * as webFunctions from '../exports/web.js';

const webManager = {
    createInstance: () => {
        return {
            getUserMdtData: webFunctions.getUserMdtData,
            isOnDuty: webFunctions.isOnDuty
        };
    }
};

export default webManager;
