import moment from 'npm:moment';
import { TimestampInput } from '../../@types/timestamps.types';

export const formatUptime = async (uptime: number): Promise<string> => {
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const minutes = Math.floor((uptime / 60) % 60);
    const seconds = Math.floor(uptime % 60);

    return `${days} zile, ${hours} ore, ${minutes} minute si ${seconds} secunde`;
};

export const formatTime = async (time: TimestampInput, timezone: string): Promise<string> => {
    return moment(time).utcOffset(timezone).format('DD/MM/YYYY HH:mm:ss');
};

export const formatTimestamp = async (time: TimestampInput, timezone: string): Promise<string> => {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString('ro-RO', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return formattedDate;
};

export const formatDefTime = async (time: TimestampInput, timezone: string): Promise<string> => {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString('ro-RO', {
        timeZone: timezone
    });

    return formattedDate;
};
