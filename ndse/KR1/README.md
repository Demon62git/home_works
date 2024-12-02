* Docker образ: https://hub.docker.com/repository/docker/demon62/kr1/general
* Для теста API использовался Postman
* Для теста чата создана страница доступная по ссылке http://localhost/

### Модуль «Пользователи»
Модуль user.services:
- userService.create - Функция «Создание пользователя»
- userService.findByEmail - Функция «Поиск пользователя по email»

### Модуль «Объявления»
Модуль advertisement.services:
- AdvertisementService.find - Функция «Поиск объявления»
- AdvertisementService.create - Функция «Создание объявления»
- AdvertisementService.remove - Функция «Удаление объявления»

### Модуль «Чат»
Модуль chat.services:
- chatService.find - Функция «Получить чат между пользователями»
- chatService.sendMessage - Функция «Отправить сообщение»
- chatService.subscribe - Функция «Подписаться на новые сообщения в чате»
- chatService.getHistory - Функция «Получить историю сообщений чата»




#### 2.1. Регистрация 

Запрос `POST` на `http://localhost/api/user/signup`

Зарегистрированы пользователи:
* Пользователи: 

```javascript
{
    "data":
    {
        "_id":"67329363c19121ea01e7879e",
        "email":"Ivan@mail.ru",
        "name":"Ivan",
        "contactPhone":"+7 947 123 45 67"
    },
        "status":"ok"
} 
```
pass: Ivan
"$2b$10$mijpzz27fgO11H2q4LDPkuUKzu255uFitMmdssNBnoGZQWzhvfj0C"


```javascript
{
    "data":
    {
        "_id":"6734c8287a936e39d0909bde",
        "email":"Vladimir@mail.ru",
        "name":"Vladimir",
        "contactPhone":"+7 656 543 21 01"
    },
        "status":"ok"
}
```
pass: 123
"$2b$10$wDo8DX5DdAw13.qFK7A6Ye/7yplkA0cPvg783.g/Sd2wEYO1Rp396"


При попытке указать уже зарегистированный email - ошибка:
```javascript
{
    "error":"Пользователь уже существует",
    "status":"error"
}
```

#### 2.2. Аутентификация 

Запрос `POST` на `http://localhost/api/user/signin`

Попытка авторизации:
```javascript
{
  "email": "Ivan@mail.ru",
  "password": "Ivan"
}
```

Ответ:
```javascript
{
    "data":
    {
        "_id":"67329363c19121ea01e7879e",
        "email":"Ivan@mail.ru",
        "name":"Ivan",
        "contactPhone":"+7 947 123 55 66"
    },
        "status":"ok"
}
```

В случае ошибки приходит:
```javascript
{
    "error":"Неверный логин или пароль",
    "status":"error"
}
```

#### 2.3. Просмотр объявлений

Запрос `GET` на `http://localhost/api/advertisements` — получить список объявлений:
```javascript
{
    "data": [
        {
            "_id": "6743307e98807510db7a5bbf",
            "shortText": "Седло для велосипеда",
            "description": "Добрым людям",
            "images": [],
            "user": {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            "createdAt": "2024-11-24T13:56:14.299Z",
            "tags": []
        },
        {
            "_id": "67437eb63da9ce5075413c16",
            "shortText": "Продам табуретку",
            "description": "У табуретки две ноги",
            "images": [],
            "user": {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            "createdAt": "2024-11-24T19:29:58.599Z",
            "tags": []
        },
        {
            "_id": "674396c8625dd8cfd61ff2e9",
            "shortText": "Продам слона",
            "description": "Фиолетовый в крапинку",
            "images": [
                "uploads\\674396c8625dd8cfd61ff2e9\\slon.jpg"
            ],
            "user": {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            "createdAt": "2024-11-24T21:12:40.009Z",
            "tags": []
        },
        {
            "_id": "6743adba625dd8cfd61ff30a",
            "shortText": "Продаю рога и копыта",
            "description": "настоящие большие",
            "images": [
                "uploads\\6743adba625dd8cfd61ff30a\\horns.jpg"
            ],
            "user": {
                "_id": "6734c8287a936e39d0909bde",
                "name": "Vladimir"
            },
            "createdAt": "2024-11-24T22:50:34.885Z",
            "tags": [
                "рога",
                "копыта"
            ]
        },
    ],
    "status": "ok"
}
```

Запрос `GET` на `http://localhost/api/advertisements/674396c8625dd8cfd61ff2e9` —  получить данные объявления:
```javascript
{
    "data": {
        "_id": "674396c8625dd8cfd61ff2e9",
        "shortText": "Продам слона",
        "description": "Фиолетовый в крапинку",
        "images": [
            "uploads\\674396c8625dd8cfd61ff2e9\\slon.jpg"
        ],
        "user": {
            "_id": "67329363c19121ea01e7879e",
            "name": "Ivan"
        },
        "createdAt": "2024-11-24T21:12:40.009Z",
        "tags": []
    },
    "status": "ok"
}
```


Запрос `GET` на `http://localhost/api/advertisement?shortText=продам` —  shortText — поиск регулярным выражением:

```javascript
{
    "data": [
        {
            "_id": "674396c8625dd8cfd61ff2e9",
            "shortText": "Продам слона",
            "description": "Фиолетовый в крапинку",
            "images": [
                "uploads\\674396c8625dd8cfd61ff2e9\\slon.jpg"
            ],
            "user": {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            "createdAt": "2024-11-24T21:12:40.009Z",
            "tags": []
        }
        {
            "_id": "67437dcf3da9ce5075413c0c",
            "shortText": "Продам табуретку",
            "description": "У табуретки две ноги",
            "images": [],
            "user": {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            "createdAt": "2024-11-24T19:26:07.998Z",
            "tags": []
        },
    ],
    "status": "ok"
}
```

Запрос `GET` на `http://localhost/api/advertisement?description=д` —  description — поиск регулярным выражением:

```javascript
{
    "data": [
        {
            "_id": "674332cf6bbfd42dd0317bda",
            "shortText": "Седло для велосипеда",
            "description": "Добрым людям",
            "images": [],
            "user": {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            "createdAt": "2024-11-24T14:06:07.755Z",
            "tags": []
        },
        {
            "_id": "67437dcf3da9ce5075413c0c",
            "shortText": "Продам табуретку",
            "description": "У табуретки две ноги",
            "images": [],
            "user": {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            "createdAt": "2024-11-24T19:26:07.998Z",
            "tags": []
        },
    ],
    "status": "ok"
}
```

Запрос `GET` на `http://localhost/api/advertisement?userId=6734c8287a936e39d0909bde` —  userId — точное совпадение:

```javascript
{
    "data": [
        {
            "_id": "6743adba625dd8cfd61ff30a",
            "shortText": "Продаю рога и копыта",
            "description": "настоящие большие",
            "images": [
                "uploads\\6743adba625dd8cfd61ff30a\\horns.jpg"
            ],
            "user": {
                "_id": "6734c8287a936e39d0909bde",
                "name": "Vladimir"
            },
            "createdAt": "2024-11-24T22:50:34.885Z",
            "tags": [
                "рога",
                "копыта"
            ]
        }
    ],
    "status": "ok"
}
```

Запрос `GET` на `http://localhost/api/advertisement?tags=рога` —  tags — значение в базе данных должно включать все искомые значения:
```javascript
{
    "data": [
        {
            "_id": "6743adba625dd8cfd61ff30a",
            "shortText": "Продаю рога и копыта",
            "description": "настоящие большие",
            "images": [
                "uploads\\6743adba625dd8cfd61ff30a\\horns.jpg"
            ],
            "user": {
                "_id": "6734c8287a936e39d0909bde",
                "name": "Vladimir"
            },
            "createdAt": "2024-11-24T22:50:34.885Z",
            "tags": [
                "рога",
                "копыта"
            ]
        }
    ],
    "status": "ok"
}
```


#### 2.4. Управление объявлениями

Запрос `POST` на `http://localhost/api/advertisements` — создать объявление:
```javascript
{
    "data": {
        "_id": "674396c8625dd8cfd61ff2e9",
        "shortText": "Продам слона",
        "description": "Фиолетовый в крапинку",
        "images": [
            "uploads\\674396c8625dd8cfd61ff2e9\\slon.jpg"
        ],
        "user": {
            "_id": "67329363c19121ea01e7879e",
            "name": "Ivan"
        },
        "createdAt": "2024-11-24T13:36:53.370Z",
        "tags": []
    },
    "status": "ok"
}
```

```javascript
{
    "data":
    {
        "_id":"674331d698807510db7a5c0f",
        "shortText":"Седло для велосипеда",
        "description":"Добрым людям",
        "images":[],
        "user":
            {
                "_id":"67329363c19121ea01e7879e",
                "name":"Ivan"
            },
        "createdAt":"2024-11-24T14:01:58.949Z",
        "tags":[]
    },
            "status":"ok"
}
```

Запрос `DELETE` на `http://localhost/api/advertisements/674331d698807510db7a5c0f` — удалить объявление:

Авторизовавшись под другим пользователем, при попытке удалить вдаётся сообщение об ошибке 403:
```javascript
{
    "error":"Ошибка удаления: Вы не являетесь автором объявления",
    "status":"error"
}
```

В случае авторизации под логином автора:
```javascript
{
    "message": "Объявление 67438f27c43c369b7f4e01e0 удалено",
    "status": "ok"
}
```



#### 2.5. Общение

#### Получить чат между пользователями, по id собеседника и id текущего пользователя

Запрос `GET` на `http://localhost/api/chat/?users=67329363c19121ea01e7879e&users=6734c8287a936e39d0909bde`:

```javascript
{
    "data": {
        "_id": "6743b9cc6eb50d8aab538db2",
        "users": [
            {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            {
                "_id": "6734c8287a936e39d0909bde",
                "name": "Vladimir"
            }
        ],
        "createdAt": "2024-11-24T23:42:04.783Z",
        "messages": [
            {
                "author": "67329363c19121ea01e7879e",
                "text": "Привет Владимир!",
                "_id": "6743b9d26eb50d8aab538db3",
                "sentAt": "2024-11-24T23:42:10.490Z"
            },
            {
                "author": "6734c8287a936e39d0909bde",
                "text": "Привет Иван!",
                "_id": "6743baa36eb50d8aab538dba",
                "sentAt": "2024-11-24T23:45:39.693Z"
            },
            {
                "author": "67329363c19121ea01e7879e",
                "text": "Рога ещё продаются?",
                "_id": "6743bad56eb50d8aab538dc0",
                "sentAt": "2024-11-24T23:46:29.751Z"
            },
            {
                "author": "6734c8287a936e39d0909bde",
                "text": "Ещё остались, и копыт ещё полно",
                "_id": "6743bb826eb50d8aab538dc7",
                "sentAt": "2024-11-24T23:49:22.289Z"
            },
            {
                "author": "67329363c19121ea01e7879e",
                "text": "Копыта не нужны, спасибо. Рогов, отсыпьте два!",
                "_id": "6743bbe16eb50d8aab538dcf",
                "sentAt": "2024-11-24T23:50:57.155Z"
            },
            {
                "author": "6734c8287a936e39d0909bde",
                "text": "Договорились!",
                "_id": "6743bbf26eb50d8aab538dd8",
                "sentAt": "2024-11-24T23:51:14.661Z"
            }
        ],
        "__v": 5
    },
    "status": "ok"
}
```

#### Получить историю сообщений из чата

Запрос `GET` на `http://localhost/api/chat/getHistory/6743b9cc6eb50d8aab538db2`:

```javascript
{
    "data": {
        "_id": "6743b9cc6eb50d8aab538db2",
        "users": [
            {
                "_id": "67329363c19121ea01e7879e",
                "name": "Ivan"
            },
            {
                "_id": "6734c8287a936e39d0909bde",
                "name": "Vladimir"
            }
        ],
        "createdAt": "2024-11-24T23:42:04.783Z",
        "messages": [
            {
                "author": "67329363c19121ea01e7879e",
                "text": "Привет Владимир!",
                "_id": "6743b9d26eb50d8aab538db3",
                "sentAt": "2024-11-24T23:42:10.490Z"
            },
            {
                "author": "6734c8287a936e39d0909bde",
                "text": "Привет Иван!",
                "_id": "6743baa36eb50d8aab538dba",
                "sentAt": "2024-11-24T23:45:39.693Z"
            },
            {
                "author": "67329363c19121ea01e7879e",
                "text": "Рога ещё продаются?",
                "_id": "6743bad56eb50d8aab538dc0",
                "sentAt": "2024-11-24T23:46:29.751Z"
            },
            {
                "author": "6734c8287a936e39d0909bde",
                "text": "Ещё остались, и копыт ещё полно",
                "_id": "6743bb826eb50d8aab538dc7",
                "sentAt": "2024-11-24T23:49:22.289Z"
            },
            {
                "author": "67329363c19121ea01e7879e",
                "text": "Копыта не нужны, спасибо. Рогов, отсыпьте два!",
                "_id": "6743bbe16eb50d8aab538dcf",
                "sentAt": "2024-11-24T23:50:57.155Z"
            },
            {
                "author": "6734c8287a936e39d0909bde",
                "text": "Договорились!",
                "_id": "6743bbf26eb50d8aab538dd8",
                "sentAt": "2024-11-24T23:51:14.661Z"
            }
        ],
        "__v": 5
    },
    "status": "ok"
}
```

#### Отправить сообщение

Запрос `POST` на `http://localhost/api/chat` 
Тело запроса: 
```javascript
{
    "author": "67329363c19121ea01e7879e",
    "receiver": "6734c8287a936e39d0909bde",
    "text": "Привет Владимир!"
}
```

Результат:
```javascript
{
    "data": {
        "author": "67329363c19121ea01e7879e",
        "text": "Привет Владимир!",
        "_id": "6743b9d26eb50d8aab538db3",
        "sentAt": "2024-11-24T23:42:10.490Z"
    },
    "status": "ok"
}
```


* Сохранённые пользователи в БД: 

_id":"67329363c19121ea01e7879e",
"email":"Ivan@mail.ru",
"name":"Ivan",
"contactPhone":"+7 947 123 45 67"
 pass: Ivan ("$2b$10$mijpzz27fgO11H2q4LDPkuUKzu255uFitMmdssNBnoGZQWzhvfj0C")

_id":"6734c8287a936e39d0909bde",
"email":"Vladimir@mail.ru",
"name":"Vladimir",
"contactPhone":"+7 656 543 21 01"
 pass: 123 ("$2b$10$wDo8DX5DdAw13.qFK7A6Ye/7yplkA0cPvg783.g/Sd2wEYO1Rp396")


* Сохранённые объявления в БД:
_id: '6743307e98807510db7a5bbf',
shortText: 'Седло для велосипеда',

_id: '67437eb63da9ce5075413c16',
shortText: 'Продам табуретку', 

_id: '674396c8625dd8cfd61ff2e9',
shortText: 'Продам слона', 

_id: '6743adba625dd8cfd61ff30a',
shortText: 'Продаю рога и копыта',
