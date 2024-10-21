import mongoose from 'npm:mongoose';

const forumThreadSchema = new mongoose.Schema({
    tip_: String,
    uniqueID: String,
    active: Boolean,
    data: Object
});

const ForumThread = mongoose.model('ForumThread', forumThreadSchema);

export default ForumThread;
