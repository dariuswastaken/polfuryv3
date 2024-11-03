interface EmbedOptions {
    title?: string;
    description?: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    footer?: string;
    color?: string;
}

interface Embeds {
    createDefaultEmbed: (description: string, options: EmbedOptions) => Promise<void>;
    createErrorEmbed: (type: string, description: string, options: EmbedOptions) => Promise<void>;
    createSuccessEmbed: (type: string, description: string, options: EmbedOptions) => Promise<void>;
    createWarningEmbed: (type: string, description: string, options: EmbedOptions) => Promise<void>;
    createLogEmbed: (options: EmbedOptions) => Promise<void>;
    createForumThreadEmbed: (options: EmbedOptions) => Promise<void>;
    createEmbed: (options: EmbedOptions) => Promise<void>;
}

interface Menus {
    createSelectMenu: (options: any) => any;
    createButtonMenu: (options: any) => Array<any>;
}

interface Modals {
    createModal: (options: any) => Promise<void>;
}

export interface DiscordInstance {
    embeds: Embeds;
    menus: Menus;
    modals: Modals;
}
