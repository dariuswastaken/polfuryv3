import { TimestampInput } from '../../@types/timestamps.types';

interface TimeUtils {
    formatUptime: (uptime: number) => Promise<string>;
    formatTime: (time: TimestampInput, timezone: string) => Promise<string>;
    formatTimestamp: (time: TimestampInput, timezone: string) => Promise<string>;
    formatDefTime: (time: TimestampInput, timezone: string) => Promise<string>;
}

interface UniqueUtils {
    createUniqueID: () => Promise<string>;
    generateToken: (length: number, tip: string) => Promise<string>;
}

export interface UtilsInstance {
    time: TimeUtils;
    uniques: UniqueUtils;
}
