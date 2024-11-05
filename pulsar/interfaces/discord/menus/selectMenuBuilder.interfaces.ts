import { SelectMenuOptionLayout } from '../../../@types/discord/selectMenu.types.ts';

export interface SelectMenuBuilderOptions {
    type: any;
    options: SelectMenuOptionLayout[];
    id: string;
    placeholder: string;
    channelType: string;
    maxValues: number;
    minValues: number;
}
