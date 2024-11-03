import mongoose, { Model } from 'npm:mongoose';
import { IForumThread } from '../../interfaces/schemaInterfaces/forumThread.interfaces.ts';

const forumThreadSchema = new mongoose.Schema<IForumThread>(
    {
        tip_: String,
        uniqueID: String,
        active: Boolean,
        data: Object
    },
    { collection: 'forumthreads' }
);

const ForumThread: Model<IForumThread> = mongoose.model<IForumThread>(
    'ForumThread',
    forumThreadSchema
);

export default ForumThread;
