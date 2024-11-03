import * as fileExports from '../exports/files.ts';
import { Manager } from '../interfaces/base/managers.interfaces.ts';
import { FileInstance } from '../interfaces/managerInterfaces/fileManager.interfaces.ts';

const fileManager: Manager<Object> = {
    createInstance: (): FileInstance => {
        return {
            createLogsManager: fileExports.createLogsManager,
            loadFilesFromDir: fileExports.loadFilesFromDir
        };
    }
};

export default fileManager;
