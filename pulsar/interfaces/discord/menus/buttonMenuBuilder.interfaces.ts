export interface ButtonMenuBuilderOptions {
    perLine: number;
    buttons: { id: string; style: string; label: string; disabled?: boolean }[];
}
