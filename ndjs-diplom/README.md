# **Запуск приложения**

Для запуска приложения в корне проекта находятся следующие файлы:

- package.json и package-lock.json с описанными зависимостями,
- Dockerfile для сборки образа приложения,
- docker-compose.yaml с сервисом приложения и сервисом MondoDB,
- в проекте располагается файл со списком и описанием переменных окружения используемых в приложении - .env-example,
- для тестирования API использовался POSTMAN,
- для проверки работы функциональности по чату поддержки и взаимодействия через websocket была создана html страница - шаблон чата, доступная по адресу `http://localhost/support/index.html`.

В БД предварительно загружены записи трёх пользователей - обладателей одноимённых ролей:

```
- admin@mail.ru - пароль: admin
- manager@mail.ru - пароль: manager
- client@mail.ru - пароль: client
```

# **Реализация**

Согласно ТЗ, реализация сделана с использованием фреймворка `NestJS`.
БД - MongoDB

Каждый функциональный модуль реализован в виде отделного (или нескольких) модуля(класса) NestJs, или нескольких модулей условно выделенных в понимании сущностей и их функциональностей.
Таким образом выделены:

- auth - "авторизация",
- hotel - "гостиницы",
- hotel-room - "номера гостиниц",
- reservation - "бронирование",
- support-request - "запрос техподдрежки",
- user - модуль "пользователи".

* Схемы данных и интерфейсы определены согласно описания в ТЗ.
* Преобразование входных данных реализуется с помощью декоратора `@pipe`, а приведение выходных данных к требуемому виду реализуется с помощью декоратора `@interceptor`.
* Для разграничения прав доступа к контроллерам используются `@UseGuards`.

# **Тестирование**

Далее производилось тестирование перечисленных сервисов приложения, описание идёт по пунктам в порядке указанном в ТЗ.
С указанием метода и адреса запроса, а так же входных и выходных форматов. С указанием результата, в некоторых местах, для наглядности, указаны результаты в расширенном виде.

Обработка исключительных ситуаций реализована и соответствует указанным в ТЗ. В тексте дублировать не стал.

Страница для теста чата `http://localhost/support/index.html` открывалась в браузере в обычном режиме и в режиме инкогнито. В одном режиме логинился как с ролью клиента, в другом режиме с ролью менеджера. Далее в поле указывал ID заранее созданного обращения.
Далее отправлял через форму сообщение из каждого режима в ответ друг другу.

## 2.1. API Модуля «Гостиницы»

### 2.1.1. Поиск номеров

```http
GET /api/common/hotel-rooms
```

#### **Query-параметры**

- limit — количество записей в ответе;
- offset — сдвиг от начала списка;
- hotel — ID гостиницы для фильтра.

#### **Формат ответа**

```json
[
  {
    "id": string,
    "description": string,
    "images": [string],
    "hotel": {
      "id": string,
      "title": string
    }
  }
]
```

### 2.1.3. Добавление гостиницы

```http
POST /api/admin/hotels/
```

#### Body-параметры

```json
{
  "title": "hotel_1",
  "description": "Отель №1"
}
```

#### Формат ответа

```json
{
  "id": string,
  "title": string,
  "description": string
}
```

```json
{
  "title": "hotel_1",
  "description": "Отель №1",
  "_id": "67eb0b6730f60a25b68e412b",
  "createdAt": "2025-03-31T21:38:49.149Z",
  "updatedAt": "2025-03-31T21:38:49.149Z",
  "__v": 0
}
```

### 2.1.4. Получение списка гостиниц

```http
GET /api/admin/hotels/
```

### Query-параметры

- limit - количество записей в ответе.
- offset - сдвиг от начала списка.
- title - фильтр по полю.

### Формат ответа

```json
{
  "id": string,
  "title": string,
  "description": string
}
```

```json
[
  {
    "_id": "67eb0b6730f60a25b68e412b",
    "title": "hotel_1",
    "description": "Отель №1",
    "createdAt": "2025-03-31T21:38:49.149Z",
    "updatedAt": "2025-03-31T21:38:49.149Z",
    "__v": 0
  }
]
```

### 2.1.5. Изменение описания гостиницы

```http
PUT /api/admin/hotels/67eb0b6730f60a25b68e412b
```

### Body-параметры

```json
{
  "title": "Hotel Wave",
  "description": "Отель Волна"
}
```

### Формат ответа

```json
{
  "id": string,
  "title": string,
  "description": string
}
```

```json
{
  "_id": "67eb0b6730f60a25b68e412b",
  "title": "Hotel Wave",
  "description": "Отель Волна",
  "createdAt": "2025-03-31T21:38:49.149Z",
  "updatedAt": "2025-03-31T22:28:45.091Z",
  "__v": 0
}
```

### 2.1.6. Добавление номера

```http
POST /api/admin/hotel-rooms/
```

### Body-параметры

Этот запрос предполагает загрузку файлов и использует формат `multipart/form-data`.

```form-data
description: Номер 1
hotelId: 67eb0b6730f60a25b68e412b
images[]: File
```

### Формат ответа

```json
{
  "id": string,
  "description": string,
  "images": [string],
  "isEnabled": boolean,
  "hotel": {
    "id": string,
    "title": string,
    "description": string
  }
}
```

```json
{
  "hotel": {
    "_id": "67eb0b6730f60a25b68e412b",
    "title": "Hotel Wave",
    "description": "Отель Волна",
    "createdAt": "2025-03-31T21:38:49.149Z",
    "updatedAt": "2025-03-31T22:28:45.091Z",
    "__v": 0
  },
  "description": "Номер 1",
  "images": ["67eb0b6730f60a25b68e412b\\67ec39bd123a42354a274d86\\slon.jpg"],
  "isEnabled": true,
  "_id": "67ec39bd123a42354a274d86",
  "createdAt": "2025-04-01T19:08:46.838Z",
  "updatedAt": "2025-04-01T19:08:46.838Z",
  "__v": 0
}
```

### 2.1.7. Изменение описания номера

```http
PUT /api/admin/hotel-rooms/67ec3bf0123a42354a274d8b
```

#### **Body-параметры**

Этот запрос предполагает загрузку файлов и использует формат `multipart/form-data`.

```form-data
description: Номер 2
hotelId: 67eb0b6730f60a25b68e412b
isEnabled: true
images[]: File2
```

#### **Формат ответа**

```json
{
  "id": string,
  "description": string,
  "images": [string],
  "isEnabled": boolean,
  "hotel": {
    "id": string,
    "title": string,
    "description": string
  }
}
```

```json
{
  "_id": "67ec3bf0123a42354a274d8b",
  "hotel": {
    "_id": "67eb0b6730f60a25b68e412b",
    "title": "Hotel Wave",
    "description": "Отель Волна",
    "createdAt": "2025-03-31T21:38:49.149Z",
    "updatedAt": "2025-03-31T22:28:45.091Z",
    "__v": 0
  },
  "description": "Номер 2",
  "images": [
    "67eb0b6730f60a25b68e412b\\67ec3bf0123a42354a274d8b\\horns.jpg",
    "67eb0b6730f60a25b68e412b\\67ec3bf0123a42354a274d8b\\slon.jpg"
  ],
  "isEnabled": true,
  "createdAt": "2025-04-01T19:18:08.928Z",
  "updatedAt": "2025-04-01T19:51:57.328Z",
  "__v": 1
}
```

## 2.2. API Модуля «Бронирование»

### 2.2.1. Бронирование номера клиентом

```http
POST /api/client/reservations
```

#### **Body-параметры**

```json
{
  "hotelRoom": string,
  "startDate": string,
  "endDate": string
}
```

#### **Формат ответа**

```json
{
  "startDate": string,
  "endDate": string,
  "hotelRoom": {
    "description": string,
    "images": [string]
  },
  "hotel": {
    "title": string,
    "description": string
  }
}
```

```json
{
  "userId": {
    "_id": "67e9dbc38cef2e0d0c4fae4c",
    "email": "client@mail.ru",
    "passwordHash": "$2b$04$S3pxFlOKL7/gpqbm7dhQA.qgcst1x2jQtUtJjam60DYwI39NI5ONa",
    "name": "client",
    "contactPhone": "+79777777777",
    "role": "client",
    "__v": 0
  },
  "roomId": {
    "_id": "67ec3bf0123a42354a274d8b",
    "hotel": "67eb0b6730f60a25b68e412b",
    "description": "Номер 2",
    "images": [
      "67eb0b6730f60a25b68e412b\\67ec3bf0123a42354a274d8b\\horns.jpg",
      "67eb0b6730f60a25b68e412b\\67ec3bf0123a42354a274d8b\\slon.jpg"
    ],
    "isEnabled": true,
    "createdAt": "2025-04-01T19:18:08.928Z",
    "updatedAt": "2025-04-01T19:51:57.328Z",
    "__v": 1
  },
  "dateStart": "2025-02-01T00:00:00.000Z",
  "dateEnd": "2025-02-07T00:00:00.000Z",
  "_id": "67ec4933e2e031af3f2df488",
  "hotelId": {
    "_id": "67eb0b6730f60a25b68e412b",
    "title": "Hotel Wave",
    "description": "Отель Волна",
    "createdAt": "2025-03-31T21:38:49.149Z",
    "updatedAt": "2025-03-31T22:28:45.091Z",
    "__v": 0
  },
  "__v": 0
}
```

### 2.2.2. Список броней текущего пользователя

```http
GET /api/client/reservations
```

#### **Формат ответа**

````json
[
  {
    "startDate": string,
    "endDate": string,
    "hotelRoom": {
      "description": string,
      "images": [string],
    },
    "hotel": {
      "title": string,
      "description": string,
    },
  }
]
``

```json
{
  "userId": {
    "_id": "67e9dbc38cef2e0d0c4fae4c",
    "email": "client@mail.ru",
    "passwordHash": "$2b$04$S3pxFlOKL7/gpqbm7dhQA.qgcst1x2jQtUtJjam60DYwI39NI5ONa",
    "name": "client",
    "contactPhone": "+79777777777",
    "role": "client",
    "__v": 0
  },
  "roomId": {
    "_id": "67ec3bf0123a42354a274d8b",
    "hotel": "67eb0b6730f60a25b68e412b",
    "description": "Номер 2",
    "images": [
      "67eb0b6730f60a25b68e412b\\67ec3bf0123a42354a274d8b\\horns.jpg",
      "67eb0b6730f60a25b68e412b\\67ec3bf0123a42354a274d8b\\slon.jpg"
    ],
    "isEnabled": true,
    "createdAt": "2025-04-01T19:18:08.928Z",
    "updatedAt": "2025-04-01T19:51:57.328Z",
    "__v": 1
  },
  "dateStart": "2025-02-01T00:00:00.000Z",
  "dateEnd": "2025-02-07T00:00:00.000Z",
  "_id": "67ec4933e2e031af3f2df488",
  "hotelId": {
    "_id": "67eb0b6730f60a25b68e412b",
    "title": "Hotel Wave",
    "description": "Отель Волна",
    "createdAt": "2025-03-31T21:38:49.149Z",
    "updatedAt": "2025-03-31T22:28:45.091Z",
    "__v": 0
  },
  "__v": 0
}
````

### 2.2.3. Отмена бронирования клиентом

```http
DELETE /api/client/reservations/67ec4933e2e031af3f2df488
```

### 2.2.4. Список броней конкретного пользователя

```http
GET /api/manager/reservations/67e9dbc38cef2e0d0c4fae4c
```

```json
[
  {
    "startDate": string,
    "endDate": string,
    "hotelRoom": {
      "description": string,
      "images": [string]
    },
    "hotel": {
      "title": string,
      "description": string
    }
  }
]
```

```json
[
  {
    "_id": "67ec483ff98a3de8462da911",
    "userId": {
      "_id": "67e9dbc38cef2e0d0c4fae4c",
      "email": "client@mail.ru",
      "passwordHash": "$2b$04$S3pxFlOKL7/gpqbm7dhQA.qgcst1x2jQtUtJjam60DYwI39NI5ONa",
      "name": "client",
      "contactPhone": "+79777777777",
      "role": "client",
      "__v": 0
    },
    "roomId": {
      "_id": "67ec3bf0123a42354a274d8b",
      "hotel": "67eb0b6730f60a25b68e412b",
      "description": "Номер 2",
      "images": [
        "67eb0b6730f60a25b68e412b\\67ec3bf0123a42354a274d8b\\horns.jpg",
        "67eb0b6730f60a25b68e412b\\67ec3bf0123a42354a274d8b\\slon.jpg"
      ],
      "isEnabled": true,
      "createdAt": "2025-04-01T19:18:08.928Z",
      "updatedAt": "2025-04-01T19:51:57.328Z",
      "__v": 1
    },
    "dateStart": "2024-12-30T00:00:00.000Z",
    "dateEnd": "2025-01-07T00:00:00.000Z",
    "hotelId": {
      "_id": "67eb0b6730f60a25b68e412b",
      "title": "Hotel Wave",
      "description": "Отель Волна",
      "createdAt": "2025-03-31T21:38:49.149Z",
      "updatedAt": "2025-03-31T22:28:45.091Z",
      "__v": 0
    },
    "__v": 0
  }
]
```

### 2.2.5. Отмена бронирования менеджером

```http
DELETE /api/manager/reservations/67ec483ff98a3de8462da911
```

## 2.3. API Модуля «Аутентификация и авторизация»

### 2.3.1. Вход

```http
POST /api/auth/login
```

#### **Body-параметры**

```json
{
  "email": "client@mail.ru",
  "password": "client"
}
```

#### **Формат ответа**

```json
{
  "email": "client@mail.ru",
  "name": "client",
  "contactPhone": "+79777777777"
}
```

### 2.3.2. Выход

```http
POST /api/auth/logout
```

### 2.3.3. Регистрация

```http
POST /api/client/register
```

#### **Body-параметры**

```json
{
  "email": "client2@yandex.ru",
  "password": "client2",
  "name": "client2",
  "contactPhone": "+79222222222"
}
```

#### **Формат ответа**

```json
{
  "id": "67e9e2f98cef2e0d0c4fae5a",
  "email": "client2@yandex.ru",
  "name": "client2"
}
```

## 2.4. API Модуля «Управление пользователями»

### 2.4.1. Создание пользователя

```http
POST /api/admin/users/
```

#### **Body-параметры**

```json
{
  "email": "admin@mail.ru",
  "password": "admin",
  "name": "admin",
  "contactPhone": "+79123456789",
  "role": "admin"
}
```

#### **Формат ответа**

```json
{
  "id": "67e9d7dc4b4f56ad9e6b7aad",
  "email": "admin@mail.ru",
  "name": "admin",
  "contactPhone": "+79123456789",
  "role": "admin"
}
```

```json
{
  "id": "67e9dac08cef2e0d0c4fae49",
  "email": "manager@mail.ru",
  "name": "manager",
  "contactPhone": "+79111111111",
  "role": "manager"
}
```

```json
{
  "id": "67e9dbc38cef2e0d0c4fae4c",
  "email": "client@mail.ru",
  "name": "client",
  "contactPhone": "+79777777777",
  "role": "client"
}
```

### 2.4.2. Получение списка пользователей

```http
GET /api/admin/users/
GET /api/manager/users/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- name - фильтр по полю;
- email - фильтр по полю;
- contactPhone - фильтр по полю.

#### **Формат ответа**

```json
[
  {
    "id": string,
    "email": string,
    "name": string,
    "contactPhone": string
  }
]
```

## 2.5. API модуля «Чат с техподдрежкой»

### Запуск чата поддержки

Гиперссылка для открытия формы в браузере:

```http
GET /localhost/support/index.html
```

### ..Или через запросы POSTMAN:

### 2.5.1. Создание обращения в поддержку

```http
POST /api/client/support-requests/
```

#### **Body-параметры**

```json
{
  "text": string
}
```

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "isActive": boolean,
    "hasNewMessages": boolean
  }
]
```

/

```json
{
  "user": "67e9dbc38cef2e0d0c4fae4c",
  "createdAt": "2025-04-02T00:33:27.610Z",
  "messages": [
    {
      "author": "67e9dbc38cef2e0d0c4fae4c",
      "sentAt": "2025-04-02T00:33:27.610Z",
      "text": "lalala test",
      "_id": "67ec85d8d9df48326b2d7138"
    }
  ],
  "isActive": true,
  "_id": "67ec85d8d9df48326b2d7137",
  "__v": 0
}
```

### 2.5.2. Получение списка обращений в поддержку для клиента

```http
GET /api/client/support-requests/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- isActive - фильтр по полю.

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "isActive": boolean,
    "hasNewMessages": boolean
  }
]
```

```json
[
  {
    "_id": "67ec85d8d9df48326b2d7137",
    "user": {
      "_id": "67e9dbc38cef2e0d0c4fae4c",
      "email": "client@mail.ru",
      "passwordHash": "$2b$04$S3pxFlOKL7/gpqbm7dhQA.qgcst1x2jQtUtJjam60DYwI39NI5ONa",
      "name": "client",
      "contactPhone": "+79777777777",
      "role": "client",
      "__v": 0
    },
    "createdAt": "2025-04-02T00:33:27.610Z",
    "messages": [
      {
        "author": "67e9dbc38cef2e0d0c4fae4c",
        "sentAt": "2025-04-02T00:33:27.610Z",
        "text": "lalala test",
        "_id": "67ec85d8d9df48326b2d7138"
      }
    ],
    "isActive": true,
    "__v": 0
  }
]
```

### 2.5.3. Получение списка обращений в поддержку для менеджера

```http
GET /api/manager/support-requests/
```

#### **Query-параметры**

- limit - количество записей в ответе;
- offset - сдвиг от начала списка;
- isActive - фильтр по полю.

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "isActive": boolean,
    "hasNewMessages": boolean,
    "client": {
      "id": string,
      "name": string,
      "email": string,
      "contactPhone": string
    }
  }
]
```

### 2.5.4. Получение истории сообщений из обращения в техподдержку

```http
GET /api/common/support-requests/:id/messages
```

#### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "text": string,
    "readAt": string,
    "author": {
      "id": string,
      "name": string
    }
  }
]
```

```json
[
  {
    "author": {
      "_id": "67e9dbc38cef2e0d0c4fae4c",
      "email": "client@mail.ru",
      "passwordHash": "$2b$04$S3pxFlOKL7/gpqbm7dhQA.qgcst1x2jQtUtJjam60DYwI39NI5ONa",
      "name": "client",
      "contactPhone": "+79777777777",
      "role": "client",
      "__v": 0
    },
    "sentAt": "2025-04-02T00:33:27.610Z",
    "text": "lalala test",
    "_id": "67ec85d8d9df48326b2d7138"
  }
]
```

### 2.5.5. Отправка сообщения

```http
POST /api/common/support-requests/:id/messages
```

##### **Body-параметры**

```json
{
  "text": string
}
```

##### **Формат ответа**

```json
[
  {
    "id": string,
    "createdAt": string,
    "text": string,
    "readAt": string,
    "author": {
      "id": string,
      "name": string
    }
  }
]
```

### 2.5.6. Отправка события, что сообщения прочитаны +

Заполняет поле readAt сообщений отправленных до указанной даты

```http
POST /api/common/support-requests/67ec85d8d9df48326b2d7137/messages/read
```

##### **Body-параметры**

```json
{
  "createdBefore": "2025-04-01T00:00:00"
}
```

##### **Формат ответа**

```json
{
  "success": true
}
```

### 2.5.7. Подписка на сообщения из чата техподдержки

```json
{
  "author": {
    "_id": "67e9dbc38cef2e0d0c4fae4c",
    "email": "client@mail.ru",
    "passwordHash": "$2b$04$S3pxFlOKL7/gpqbm7dhQA.qgcst1x2jQtUtJjam60DYwI39NI5ONa",
    "name": "client",
    "contactPhone": "+79777777777",
    "role": "client",
    "__v": 0
  },
  "sentAt": "2025-04-02T03:05:15.757Z",
  "text": "текст сообщения 1",
  "_id": "67eca96bb1d4d001d6ae6462"
}
```

```json
[
  {
    "_id": "67e9d7dc4b4f56ad9e6b7aad",
    "email": "admin@mail.ru",
    "passwordHash": "$2b$04$U9BtJYe8KHzYEUidgP8ir.hpHVKuXffICOSZICpQVM23jlGgdWT5e",
    "name": "admin",
    "contactPhone": "+79123456789",
    "role": "admin",
    "__v": 0
  },
  {
    "_id": "67e9dac08cef2e0d0c4fae49",
    "email": "manager@mail.ru",
    "passwordHash": "$2b$04$HcGzyP1nsZ1Narlokn21TOVBFv4enHi01UfXln7Cquxp5cFeZm/pu",
    "name": "manager",
    "contactPhone": "+79111111111",
    "role": "manager",
    "__v": 0
  },
  {
    "_id": "67e9dbc38cef2e0d0c4fae4c",
    "email": "client@mail.ru",
    "passwordHash": "$2b$04$S3pxFlOKL7/gpqbm7dhQA.qgcst1x2jQtUtJjam60DYwI39NI5ONa",
    "name": "client",
    "contactPhone": "+79777777777",
    "role": "client",
    "__v": 0
  }
]
```
