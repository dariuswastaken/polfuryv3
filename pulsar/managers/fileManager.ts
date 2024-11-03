import * as fileExports from '../exports/files.js';
import { Manager } from '../interfaces/base/managers.interfaces.js';
import { FileInstance } from '../interfaces/managerInterfaces/fileManager.interfaces.js';

const fileManager: Manager<Object> = {
    createInstance: (): FileInstance => {
        return {
            createLogsManager: fileExports.createLogsManager,
            loadFilesFromDir: fileExports.loadFilesFromDir
        };
    }
};

export default fileManager;
