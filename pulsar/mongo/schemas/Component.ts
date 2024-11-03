import mongoose, { Model } from 'npm:mongoose';
import { IComponent } from '../../interfaces/schemaInterfaces/component.interfaces.ts';

const componentSchema = new mongoose.Schema<IComponent>(
    {
        tip_: String,
        componentDiscordID: String,
        componentID: String,
        disabled: Boolean
    },
    { collection: 'components' }
);

const Component: Model<IComponent> = mongoose.model<IComponent>('Component', componentSchema);

export default Component;
