import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Rather Not Say'], default: 'Rather Not Say' },
  dateOfBirth: { type: Date },
  bio: { type: String }
})

const User = models.User || model('User', UserSchema);

export default User;