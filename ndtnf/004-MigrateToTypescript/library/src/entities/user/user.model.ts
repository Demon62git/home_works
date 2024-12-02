import { model, Schema } from 'mongoose';
import { IUser } from './user.interface'

const userSchema = new Schema(
    {
    email:     { type: String, required: true, unique: true },  
    login:     { type: String, required: true, unique: true },
    firstname: { type: String },
    name:      { type: String },
    thirdname: { type: String },
    role:      { type: String },
    password:  { type: String, required: true },
});

export const UserModel = model<IUser & Document>('User', userSchema)