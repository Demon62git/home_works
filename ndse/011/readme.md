При запуске Docker-контейнеров с MongoDB можно автоматически загружать начальные данные.
### Использование Docker-entrypoint-initdb.d

Docker предоставляет возможность автоматического выполнения скриптов и загрузки данных при первом запуске контейнера. Это делается путем размещения файлов в директории /docker-entrypoint-initdb.d.

#### Шаги:

1. Создать директорию и файл на хосте, где будет храниться скрипт инициализации:
```
  ./data\mongo\init-mongo.js
```

2. В файле могут быть SQL-скрипты, JSON-файлы или другие файлы, которые MongoDB сможет обработать. 
Например, файл init-mongo.js со следующими командами:
   
```javascript

   // init-mongo.js
   db = db.getSiblingDB('Имя_БД');
   
   db.createCollection('Имя_коллекции');
   
   // Данные
   db.users.insertMany([
     { name: 'Иван', age: 30, city: 'Москва' },
     { name: 'Анна', age: 25, city: 'Санкт-Петербург' }
   ]);
```

3. В файле `docker-compose.yml`, в разделе описания сервиса mongoDB, вставить указание для копирования директории с файлом в контенер:
```
volumes:
      - ./data/mongo/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro 
```