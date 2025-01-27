import { model } from "mongoose";
import { Document, models, Schema } from "mongoose";
import { string } from "zod";

export interface IBanks extends Document {
    _id: string;
    name: string;
    organizer: { _id: string, firstName: string, lastName: string, username: string}
}

const BanksSchema = new Schema({
    accountName: { type: String, required: true},
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Banks = models.Banks || model('Banks', BanksSchema);

export default Banks;