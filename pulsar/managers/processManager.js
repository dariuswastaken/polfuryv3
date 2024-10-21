import * as processFunctions from '../exports/process.js';

const processManager = {
    createInstance: () => {
        return {
            createErrorHandler: processFunctions.createErrorHandler
        };
    }
};

export default processManager;
