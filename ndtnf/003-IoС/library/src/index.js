import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { middleware } from './middleware/index.js'
import router from './routes/index.js'
import config from './config/index.js'
import db from './services/db.service.js'
import passport from './services/passport.service.js'

const port = config.appPort
const app = express()
const server = http.Server(app)
const io = new Server(server)

app.set('views', 'src/views')
app.set('view engine', 'ejs')

app.use(middleware.sessionSet)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(middleware.logger)
app.use(router)
app.use(middleware.err404)
await db.connect()

io.on('connection', (socket) => {
  const { id } = socket
  console.log(`Подключение по соккету - ${id}`)

  socket.on('message-to-me', (msg) => {
    msg.type = 'me'
    socket.emit('message-to-me', msg)
  })

  socket.on('message-to-all', (msg) => {
    msg.type = 'all'
    socket.broadcast.emit('messge-to-all', msg)
    socket.emit('message-to-all', msg)
  })

  const { roomName } = socket.handshake.query
  console.log(`Название чата - ${roomName}`)
  socket.join(roomName)
  socket.on('message-to-room', (msg) => {
    console.log(`Сообщение - ${msg}`)
    msg.type = `roomName${roomName}`
    socket.to(roomName).emit('message-to-room', msg)
    socket.emit('message-to-room', msg)
  })

  socket.on('disconnect', () => {
    console.log(`Отключение от соккета - ${id}`)
  })
})

server.listen(port, () =>
  console.log(`Ручки можно проверить на http://localhost:${port}`),
)
