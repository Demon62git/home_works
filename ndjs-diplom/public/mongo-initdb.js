// init-mongo.js
db = db.getSiblingDB('hotel');
db.createCollection('users');

db.users.insertMany([
  {
    _id: ObjectId('67e9d7dc4b4f56ad9e6b7aad'),
    email: 'admin@mail.ru',
    passwordHash:
      '$2b$04$U9BtJYe8KHzYEUidgP8ir.hpHVKuXffICOSZICpQVM23jlGgdWT5e',
    name: 'admin',
    contactPhone: '+79123456789',
    role: 'admin',
  },
  {
    _id: ObjectId('67e9dac08cef2e0d0c4fae49'),
    email: 'manager@mail.ru',
    passwordHash:
      '$2b$04$HcGzyP1nsZ1Narlokn21TOVBFv4enHi01UfXln7Cquxp5cFeZm/pu',
    name: 'manager',
    contactPhone: '+79111111111',
    role: 'manager',
  },
  {
    _id: ObjectId('67e9dbc38cef2e0d0c4fae4c'),
    email: 'client@mail.ru',
    passwordHash:
      '$2b$04$S3pxFlOKL7/gpqbm7dhQA.qgcst1x2jQtUtJjam60DYwI39NI5ONa',
    name: 'client',
    contactPhone: '+79777777777',
    role: 'client',
  },
]);
