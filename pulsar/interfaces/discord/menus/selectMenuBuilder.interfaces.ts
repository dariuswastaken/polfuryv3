export interface SelectMenuBuilderOptions {
    type: any;
    options: { label: string; value: string }[];
    id: string;
    placeholder: string;
    channelType: string;
    maxValues: number;
    minValues: number;
}
