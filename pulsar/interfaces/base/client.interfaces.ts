import { Collection } from 'npm:discord.js';

export interface ClientCollections {
    events: Collection<string, any>;
    slashCommands: Collection<string, any>;
    buttonInteractionEvents: Collection<string, any>;
    contextMenus: Collection<string, any>;
    handlers: Collection<string, any>;
    modalInteractionEvents: Collection<string, any>;
    stringSelectMenuInteractionEvents: Collection<string, any>;
}
