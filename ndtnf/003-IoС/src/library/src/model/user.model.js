import { model, Schema } from 'mongoose';

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

const UserModel = model('User', userSchema);

export default UserModel;