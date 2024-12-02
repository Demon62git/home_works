// init-mongo.js
db = db.getSiblingDB('advertisement');
db.createCollection('users');
   
// Начальные данные "Пользователи"
db.users.insertMany([
    { 
        _id: ObjectId('6734c8287a936e39d0909bde'),
        email: 'Vladimir@mail.ru',
        passwordHash: '$2b$10$wDo8DX5DdAw13.qFK7A6Ye/7yplkA0cPvg783.g/Sd2wEYO1Rp396',
        name: 'Vladimir',
        contactPhone: '+7 656 543 21 01',
    },

    { 
        _id: ObjectId('67329363c19121ea01e7879e'),
        email: 'Ivan@mail.ru',
        passwordHash: '$2b$10$mijpzz27fgO11H2q4LDPkuUKzu255uFitMmdssNBnoGZQWzhvfj0C', 
        name: 'Ivan',
        contactPhone: '+7 947 123 45 67',
    },
]);


// Начальные данные "Объявления"
db.createCollection('advertisements');
db.advertisements.insertMany([
    { 
        _id: ObjectId('6743307e98807510db7a5bbf'),
        shortText: 'Седло для велосипеда',
        description: 'Добрым людям',
        images: [],
        userId: '67329363c19121ea01e7879e',
        createdAt: new Date(),
        tags: [],
        isDeleted: false, 
    },

    {   
        _id: ObjectId('67437eb63da9ce5075413c16'),
        shortText: 'Продам табуретку',
        description: 'У табуретки две ноги',
        images: [],
        userId: '67329363c19121ea01e7879e',
        createdAt: new Date(),
        tags: [],
        isDeleted: false,
    },

    {   
        _id: ObjectId('674396c8625dd8cfd61ff2e9'),
        shortText: 'Продам слона',
        description: 'Фиолетовый в крапинку',
        images: [
            "uploads\\674396c8625dd8cfd61ff2e9\\slon.jpg"
        ],
        userId: '67329363c19121ea01e7879e',
        createdAt: new Date(),
        tags: [],
        isDeleted: false,
    },

    {   
        _id: ObjectId('6743adba625dd8cfd61ff30a'),
        shortText: 'Продаю рога и копыта',
        description: 'настоящие большие',
        images: [
            "uploads\\6743adba625dd8cfd61ff30a\\horns.jpg"
        ],
        userId: '6734c8287a936e39d0909bde',
        createdAt: new Date(),
        tags: [
            "рога",
            "копыта"
        ],
        isDeleted: false,
    }
]);