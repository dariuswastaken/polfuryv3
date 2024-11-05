export interface WebInstance {
    getUserMdtData: (userId: number) => Promise<any>;
    isOnDuty: (userId: number) => Promise<undefined | boolean>;
    getUserServerProfile: (userId: number) => Promise<any>;
}
