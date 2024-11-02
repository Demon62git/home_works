## Задание 1: контейнеризация

С помощью команды `docker run` создаю контейнер library на основе образа с Node.js версии 22.5. с содержимым из директории 009/src проекта внутрь контейнера в рабочий каталог /app. В параметрах, так же, указываю проброс порта 80 на хосте к порту 3001 внутри контейнера. Это позволит обращаться к приложению через порт 80:

```
docker run -it --rm --name library -v %cd%:/app -w /app -e PORT=3001 -p 80:3001 node:22.5 /bin/bash
```
```
Unable to find image 'node:22.5' locally
22.5: Pulling from library/node
18bb0bf9b4dc: Download complete
63824f9ef397: Download complete
30b93c12a9c9: Download complete
9e3b63b7d038: Download complete
d6dc1019d793: Download complete
10d643a5fa82: Download complete
ca4e5d672725: Download complete
50fc95442b3d: Download complete
Digest: sha256:86915971d2ce1548842315fcce7cda0da59319a4dab6b9fc0827e762ef04683a
Status: Downloaded newer image for node:22.5
```

Проврека содержимого контейнера:
```
ls
```
```
book.js
index.js
log
middleware
package.json
routes
store.js
uploads
views
```

`npm install` - установка зависимостей:
Проврека содержимого контейнера:
```
ls
```
```
book.js
index.js
log
middleware
node_modules        +
package-lock.json   +
package.json
routes
store.js
uploads
views
```

`npm run test_docker` - тестовый запуск из контейнера.
Через браузер или командную строку, по адресу localhost, API преложения возвращает предсказуемый результат. Функционал полносью работает:
Через браузер localhost/index;
Из командной строки , при помощи команды `curl` localhost/api/books.

## Теперь можно собрать образ
Dockerfile находится в одной директории с package.json.

Содержимое Dockerfile:
```
FROM node:22.5-alpine

WORKDIR /app
ARG NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY ./src src/

CMD ["npm", "run", "start_server"]
```

Для сборки образа с заданным тэгом library, из папки проекта запускаю команду `docker build -t 009library:v1.0.0 .`:
```
[+] Building 1.8s (11/11) FINISHED                                                                                                                      docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                                                    0.0s
 => => transferring dockerfile: 190B                                                                                                                                    0.0s 
 => [internal] load metadata for docker.io/library/node:22.5-alpine                                                                                                     1.1s 
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                             0.0s
 => [internal] load .dockerignore                                                                                                                                       0.0s
 => => transferring context: 2B                                                                                                                                         0.0s 
 => [1/5] FROM docker.io/library/node:22.5-alpine@sha256:9fcc1a6da2b9eee38638df75c5f826e06e9c79f6a0f97f16ed98fe0ebb0725c0                                               0.0s 
 => => resolve docker.io/library/node:22.5-alpine@sha256:9fcc1a6da2b9eee38638df75c5f826e06e9c79f6a0f97f16ed98fe0ebb0725c0                                               0.0s 
 => [internal] load build context                                                                                                                                       0.0s 
 => => transferring context: 1.39kB                                                                                                                                     0.0s 
 => CACHED [2/5] WORKDIR /app                                                                                                                                           0.0s 
 => CACHED [3/5] COPY ./package*.json ./                                                                                                                                0.0s 
 => CACHED [4/5] RUN npm install                                                                                                                                        0.0s 
 => CACHED [5/5] COPY ./src src/                                                                                                                                        0.0s 
 => exporting to image                                                                                                                                                  0.5s 
 => => exporting layers                                                                                                                                                 0.0s 
 => => exporting manifest sha256:acdeed9886c4b11d9abb57b73aefdfb2bdebc3f5bf67c97cf20d7df39420147f                                                                       0.0s 
 => => exporting config sha256:177e4841f1dbbba404a78199084ab0682bf848dc5df2197b184b354cc7a5d1d2                                                                         0.0s 
 => => exporting attestation manifest sha256:38aa99b6e3f0cab4ced889d90ff3f501923bcee89d7ac342852ef671c32a9cd3                                                           0.0s 
 => => exporting manifest list sha256:d84fd8d693101914edbc02b9c58adba432be479bb575f259d6781ee29bf0efbf                                                                  0.0s
 => => naming to docker.io/library/009library:v1.0.0                                                                                                                    0.0s 
 => => unpacking to docker.io/library/009library:v1.0.0                                                                                                                 0.4s 

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/x46qce4zn9br3nxig0o3k56nr

What's next:
    View a summary of image vulnerabilities and recommendations → docker scout quickview
```

Проверка наличия нового образа - `docker images`:
|REPOSITORY|   TAG |      IMAGE ID |      CREATED |        SIZE|
|-|-|-|-|-|
|009library|   v1.0.0|    d84fd8d69310|   6 minutes ago|   228MB|

Проверка запуска контейнера из нового образа:
`docker run -it --rm --name library -e PORT=3000 -p 80:3000 009library:v1.0.0 `


### Публикация образа на docker hub:

Присвоение локальному образу тега - `docker tag 009library:v1.0.0 demon62/library:v1.0.0`:
`docker images`
|REPOSITORY      |  TAG     |  IMAGE ID     |  CREATED        |  SIZE|
|-|-|-|-|-|
|demon62/library |  v1.0.0  |  d84fd8d69310 |  28 minutes ago | 228MB|
|009library      |  v1.0.0  | d84fd8d69310  | 28 minutes ago  | 228MB|

Авторизация на docker hub - `docker login -u demon62`:
```
Password: 
Login Succeeded
```

Публикация образа - `docker push demon62/library:v1.0.0`:
```
The push refers to repository [docker.io/demon62/library]
552f26bd08c4: Pushed
bed89b80b54c: Pushed
6ecb2bd0d8e8: Mounted from library/node
96a5ec3cf389: Pushed
c42ead0bc568: Pushed
c6a83fedfae6: Mounted from library/node
8d90f41c769e: Mounted from library/node
016ebde295dd: Pushed
c4f54159f74a: Mounted from library/node
v1.0.0: digest: sha256:d84fd8d693101914edbc02b9c58adba432be479bb575f259d6781ee29bf0efbf size: 856
```

Загруженный образ загружен на docker hub - https://hub.docker.com/r/demon62/library.