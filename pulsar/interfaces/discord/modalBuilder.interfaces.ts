interface InputField {
    id: string;
    placeholder?: string;
    label: string;
    required?: boolean;
    style: any;
}

export interface CreateModalOptions {
    id: string;
    title: string;
    inputs: InputField[];
}
