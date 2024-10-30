## Необходимые педварительные действия
Выполнение задания производится под управлением Windows 10 enterprise
Скачан и установлен Docker Desktop
Включена поддержка hyper-V в Windows
Зарегестрирован аккаунт на docker.com
Аккаунт подтверждён через почту

## Задание 1 - Docker CLI

### Загрузите образ busybox последней версии
- команда: `docker pull busybox`
- Результат:
```
Using default tag: latest
latest: Pulling from library/busybox
a46fbb00284b: Download complete
Digest: sha256:768e5c6f5cb6db0794eec98dc7a967f40631746c32232b78a3105fb946f3ab83
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

What's next:
    View a summary of image vulnerabilities and recommendations → docker scout quickview busybox
```

### Запустите новый контейнер busybox с командой ping сайта netology.ru, и количеством пингов 7, поименуйте контейнер pinger
- команда: `docker images`
- Результат:
```
PING netology.ru (188.114.99.235): 56 data bytes
64 bytes from 188.114.99.235: seq=0 ttl=63 time=66.618 ms
64 bytes from 188.114.99.235: seq=1 ttl=63 time=63.802 ms
64 bytes from 188.114.99.235: seq=2 ttl=63 time=65.367 ms
64 bytes from 188.114.99.235: seq=3 ttl=63 time=61.938 ms
64 bytes from 188.114.99.235: seq=4 ttl=63 time=173.705 ms
64 bytes from 188.114.99.235: seq=5 ttl=63 time=65.816 ms
64 bytes from 188.114.99.235: seq=6 ttl=63 time=66.973 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 61.938/80.602/173.705 ms
```

### Выведите на список всех контейнеров - запущенных и остановленных
- команда: `docker ps -a`
- Результат:
|CONTAINER ID|IMAGE|COMMAND|CREATED|STATUS|PORTS|NAMES|
|-|-|-|-|-|-|-|
|54c36e4b0708|busybox|"ping -c 7 netology.…"|About a minute ago|Exited (0) 59 seconds ago|  |pinger|

### Выведите на экран логи контейнера с именем pinger
- команда: `docker logs pinger`
- Результат:
```
PING netology.ru (188.114.99.235): 56 data bytes
64 bytes from 188.114.99.235: seq=0 ttl=63 time=66.618 ms
64 bytes from 188.114.99.235: seq=1 ttl=63 time=63.802 ms
64 bytes from 188.114.99.235: seq=2 ttl=63 time=65.367 ms
64 bytes from 188.114.99.235: seq=3 ttl=63 time=61.938 ms
64 bytes from 188.114.99.235: seq=4 ttl=63 time=173.705 ms
64 bytes from 188.114.99.235: seq=5 ttl=63 time=65.816 ms
64 bytes from 188.114.99.235: seq=6 ttl=63 time=66.973 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 61.938/80.602/173.705 ms
```

### Запустите второй раз контейнера с именем pinger
- команда: `docker start pinger`
- Результат: запустился на 7 секунд

### Выведите на список всех контейнеров - запущенных и остановленных
- команда: `docker ps -a`
- Результат:
|CONTAINER ID|IMAGE|COMMAND|CREATED|STATUS|PORTS|NAMES|
|-|-|-|-|-|-|-|
|54c36e4b0708|busybox|"ping -c 7 netology.…"|12 minutes ago|Exited (0) 59 seconds ago|  |pinger|

### Выведите на экран логи контейнера с именем pinger
- команда: `docker logs pinger`
- Результат:
```
PING netology.ru (188.114.99.235): 56 data bytes
64 bytes from 188.114.99.235: seq=0 ttl=63 time=66.618 ms
64 bytes from 188.114.99.235: seq=1 ttl=63 time=63.802 ms
64 bytes from 188.114.99.235: seq=2 ttl=63 time=65.367 ms
64 bytes from 188.114.99.235: seq=3 ttl=63 time=61.938 ms
64 bytes from 188.114.99.235: seq=4 ttl=63 time=173.705 ms
64 bytes from 188.114.99.235: seq=5 ttl=63 time=65.816 ms
64 bytes from 188.114.99.235: seq=6 ttl=63 time=66.973 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 76.974/92.588/113.792 ms
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=63 time=39.898 ms
64 bytes from 188.114.98.224: seq=1 ttl=63 time=40.098 ms
64 bytes from 188.114.98.224: seq=2 ttl=63 time=68.192 ms
64 bytes from 188.114.98.224: seq=3 ttl=63 time=29.074 ms
64 bytes from 188.114.98.224: seq=4 ttl=63 time=28.435 ms
64 bytes from 188.114.98.224: seq=5 ttl=63 time=29.212 ms
64 bytes from 188.114.98.224: seq=6 ttl=63 time=36.749 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 28.435/38.808/68.192 ms
```

### Определите по логам общее количество запусков команды ping и какое общее количество отправленых запросов
- Результат: 
2 - команды ping
14 - кол-во отправленных запросов

### Удалите контейнер с именем pinger
- команда: `docker rm pinger`
- Результат: Контейнер удалён

### Удалите образ busybox
- команда: `docker pull busybox`
- Результат: 
```
Untagged: busybox:latest
Deleted: sha256:768e5c6f5cb6db0794eec98dc7a967f40631746c32232b78a3105fb946f3ab83
```



## Задание 2 - Environment Variables

### Используя Docker CLI выполните следующие действия:

### Загрузите образ node версии 15.14
- команда: `docker pull node:15.14`
- Результат: 
```
15.14: Pulling from library/node
4b57d41e8391: Download complete
bfde2ec33fbc: Download complete
bd821d20ef8c: Download complete
55fab5cadd3c: Download complete
dc05be471d51: Download complete
6041b69671c6: Download complete
989c5d2d2313: Download complete
787f5e2f1047: Download complete
7b6173a10eb8: Download complete
Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Status: Downloaded newer image for node:15.14
docker.io/library/node:15.14

What's next:
    View a summary of image vulnerabilities and recommendations → docker scout quickview node:15.14
```

### Запустите контейнер node в интерактивном режиме подключения терминала, поименуйте его mynode, передайте две переменные среды NAME=<ваше имя> и SURNAME=<ваша фамилия>
- команда: `docker run -it --name mynode -e NAME=Dmitry -e SURNAME=Limansky node:15.14`
- Результат: 
```
Welcome to Node.js v15.14.0.
Type ".help" for more information.
```

### В интерактивной среде выполнения node выполните скрипт, который выведет на экран приветсвтие: Привет, <ваше имя> <ваша фамилия>!, эти данные должны быть получены из переменных среды
- команда: `console.log(`Привет, ${process.env.NAME} ${process.env.SURNAME}!`)`
- Результат: 
```
Привет, Dmitry Limansky!
undefined
```

### Остановите контейнер
- команда: `docker stop mynode`
- Результат: контейнер остановлен
```
mynode
```
|CONTAINER ID|   IMAGE|        COMMAND|                  CREATED|          STATUS|                            PORTS|     NAMES|
|-|-|-|-|-|-|-| 
|b13ef898c4ca|   node:15.14|   "docker-entrypoint.s…"|   19 minutes ago|   Exited (137) About a minute ago|             |mynode|


### Удалите образ node версии 15.14
- команда: сначала удалить контейнер - `docker rm mynode`, затем возможно удалить образ - `docker rmi node:15.14`
- Результат: 
```
docker rm mynode
mynode

docker rmi node:15.14
Untagged: node:15.14
Deleted: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
```


## Задание 3 - Volumes

### Используя Docker CLI выполните следующие действия:

### Загрузите образ node версии 15.14
- команда: `docker pull node:15.14`
- Результат:
```
15.14: Pulling from library/node
787f5e2f1047: Download complete
7b6173a10eb8: Download complete
989c5d2d2313: Download complete
bfde2ec33fbc: Download complete
4b57d41e8391: Download complete
55fab5cadd3c: Download complete
dc05be471d51: Download complete
bd821d20ef8c: Download complete
6041b69671c6: Download complete
Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Status: Downloaded newer image for node:15.14
docker.io/library/node:15.14

What's next:
    View a summary of image vulnerabilities and recommendations → docker scout quickview node:15.14
```

- команда: `docker images`
- Результат:
|REPOSITORY|TAG|IMAGE ID|CREATED|SIZE|
|-|-|-|-|-|
|node|15.14|608bba799613|3 years ago|1.38GB|


### Запустите контейнер с именем first_node из образа node версии 15.14 в фоновом режиме, подключив папку data из текущей директории в /var/first/data контейнера
- команда: `docker run -d --name first_node -v "%cd%/data":/var/first/data node:15.14 sleep infinity`
- Результат: Папка data создалась
```
e6f39b3e60d7e5afce069c2ad7a472cd259af9432c43100afb88cb4b383549b4
```
- команда: `docker ps`
- Результат:
|CONTAINER ID|   IMAGE|        COMMAND|                  CREATED|              STATUS|              PORTS|     NAMES|
|-|-|-|-|-|-|-|
|e6f39b3e60d7|   node:15.14|   "docker-entrypoint.s…"|   About a minute ago|   Up About a minute|        |     first_node|

### Запустите контейнер с именем second_node из образа node версии 15.14 в фоновом режиме, подключив папку data из текущей директории в /var/second/data контейнера
- команда: `docker run -d --name second_node -v "%cd%/data":/var/second/data node:15.14 sleep infinity`
- Результат:
```
a72d99b39f45f63fecfb27c207f6dda2182de2935c87a7034933a75c921edc53
```
|CONTAINER ID|   IMAGE|        COMMAND|                  CREATED|          STATUS|              PORTS|     NAMES|
|-|-|-|-|-|-|-|
|a72d99b39f45|   node:15.14|   "docker-entrypoint.s…"|   46 seconds ago|   Up 45 seconds|  |               second_node|
|e6f39b3e60d7|   node:15.14|   "docker-entrypoint.s…"|   2 minutes ago |   Up About a minute|   |          first_node|


### Подключитесь к контейнеру first_node с помощью exec и создайте текстовый файл любого содержания в /var/first/data
- команда: `docker exec first_node /bin/sh -c "echo 'Hello! From first_node file data!' > /var/first/data/first_node.txt"`
- Результат: 
Ищем файл и смотрим его содержимое в контейнере first_node:
`docker exec -it first_node /bin/sh`
`ls /var/first/data`
```
first_node.txt
```
`cat /var/first/data/first_node.txt`
```
Hello! From first_node file data!
```
`exit`

Ищем файл и смотрим его содержимое в контейнере second_node:
`docker exec -it second_node /bin/sh`
`ls /var/second/data`
```
first_node.txt
```
`cat /var/second/data/first_node.txt`
```
Hello! From first_node file data!
```
`exit`

Содержимое файлов идентично


### Добавьте еще один файл в папку data на хостовой машине
- команда: создан файл host_file.txt на хосте с содержимым hello from host
- Результат:
`docker exec -it first_node /bin/sh`
`ls /var/first/data`
```
first_node.txt  host_file.txt
```
`cat /var/first/data/host_file.txt`
```
hello from host
```
`exit`

`docker exec -it second_node /bin/sh`
`ls /var/second/data`
```
first_node.txt  host_file.txt
```
`cat /var/second/data/host_file.txt`
```
hello from host
```
`exit`

Файл с содержимым появился и в первом и втором контейнерах


### Подключитесь к контейнеру second_node с помощью exec и получите список файлов в директории /var/second/data, выведете на экран содержимое файлов
- команда: 
`docker exec -it second_node /bin/sh`
`ls /var/second/data`
- Результат:
```
first_node.txt  host_file.txt
```
`cat /var/second/data/host_file.txt`
```
hello from host
```
`cat /var/second/data/first_node.txt`
```
Hello! From first_node file data!
```


### Остановите оба контейнера
- команда:
`docker stop first_node`
- Результат:
```
first_node
```

- команда:
`docker stop second_node`
- Результат:
```
second_node
```

- команда:
`docker ps -a`
- Результат:

|CONTAINER ID   |IMAGE        |COMMAND                  |CREATED          |STATUS                            |PORTS     |NAMES
|-|-|-|-|-|-|-|
|a72d99b39f45   |node:15.14   |"docker-entrypoint.s…"   |58 minutes ago   |Exited (137) About a minute ago   |          |second_node
|e6f39b3e60d7   |node:15.14   |"docker-entrypoint.s…"   |59 minutes ago   |Exited (137) 2 minutes ago        |          |first_node

### Удалите оба контейнера
- команда: 
`docker rm first_node`
`docker rm second_node`
- Результат:
|CONTAINER ID   |IMAGE     |COMMAND   |CREATED   |STATUS    |PORTS     |NAMES

### Удалите образ node версии 15.14
- команда: `docker rmi node:15.14`
- Результат:
```
Untagged: node:15.14
Deleted: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
```
`docker images`
|REPOSITORY   |TAG       |IMAGE ID   |CREATED   |SIZE|