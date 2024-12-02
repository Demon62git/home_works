import { model, Schema } from 'mongoose';

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate:
    {
      validator: (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
      message: 'Ошибка! email не соответствует шаблону: ___@___.xx'
    }
  },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  contactPhone: {
    type: String,
    validate:
    {
      //validator: (v) => /^\+7\d{10}$/.test(v),
      validator: (v) => /^\+7 \d{3} \d{3} \d{2} \d{2}$/.test(v),
      message: 'Ошибка! Номер телефона не соответствует шаблону: +7 ххх ххх хх хх'
    }
  },
});

export const UserModel = model('User', schema);