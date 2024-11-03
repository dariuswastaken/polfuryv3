import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'npm:discord.js';
import { CreateModalOptions } from '../../../interfaces/discord/modalBuilder.interfaces';

export const createModal = async ({
    id,
    title,
    inputs
}: CreateModalOptions): Promise<ModalBuilder> => {
    const modal = new ModalBuilder().setCustomId(id).setTitle(title);

    let rows = [];

    for (let input of inputs) {
        rows.push(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId(input.id)
                    .setPlaceholder(input.placeholder)
                    .setLabel(input.label)
                    .setRequired(input.required)
                    .setStyle(TextInputStyle[input.style])
            )
        );
    }

    modal.addComponents(rows);

    return modal;
};
