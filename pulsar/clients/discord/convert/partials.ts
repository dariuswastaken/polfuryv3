import { PartialsType } from '../../../@types/discord/partials.types';
import { Partials } from 'npm:discord.js';

export function convertToPartialsTypes(partials: string | string[]): PartialsType[] {
    if (partials === 'all') {
        return Object.keys(Partials) as PartialsType[];
    }
    return partials as PartialsType[];
}
