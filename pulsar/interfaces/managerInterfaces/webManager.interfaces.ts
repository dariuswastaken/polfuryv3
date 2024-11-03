export interface WebInstance {
    getUserMdtData: (userId: string) => Promise<any>;
    isOnDuty: (userId: string) => Promise<boolean>;
    getUserServerProfile: (userId: string) => Promise<any>;
    resetMDT: () => Promise<void>;
}
