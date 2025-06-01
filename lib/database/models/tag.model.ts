import { Document, model, models, Schema, Types } from "mongoose";

export interface iTag extends Document {
    _id: string;
    name: string;
    owner: { _id: string, firstName: string, lastName: string, username: string };
    createdAt: Date
}

const TagSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now },
})

const Tag = models.Tag || model('Tag', TagSchema)

export default Tag