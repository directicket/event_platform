import { Document, model, models, Schema, Types } from "mongoose";

export interface iEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location: string;
    createdAt: Date;
    imageURL: string;
    startDateTime: Date;
    expiryDate: Date;
    quantity: number;
    amountSold: number;
    price: string;
    isFree: boolean;
    url?: string;
    category: { _id: string, name: string };
    organizer: { _id: string, firstName: string, lastName: string, username: string };
    tags?: { _id: string, name: string } // add [] to the end to allow for multiple tags per item in the schema
}

const EventSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String },
    location: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    imageURL: { type: String, required: true },
    startDateTime: { type: Date, default: Date.now },
    expiryDate: { type: Date, default: Date.now },
    quantity: { type: Number, required: true },
    amountSold: { type: Number, default: 0 },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: { type: Schema.Types.ObjectId, ref: 'Tag'}
})

const Event = models.Event || model('Event', EventSchema);

export default Event;