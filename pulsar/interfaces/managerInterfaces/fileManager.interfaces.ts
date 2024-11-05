export interface FileInstance {
    createLogsManager: () => void;
    loadFilesFromDir: (dir: string, callback: (filePath: string) => void) => void;
}
