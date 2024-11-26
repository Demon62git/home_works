import express from 'express';
import http from 'http';
import { connect } from './services/db.services.js';
import config from './config/index.js';
import { sessionMiddleware } from './middleware/session.js';
import { passport } from './services/auth.services.js';
import useSocket from '../src/services/socket.services.js';
import router from './routes/index.js';
import { errPass } from './middleware/index.js';

const app = express();

const server = http.Server(app);
useSocket(server);

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errPass);

await connect();
server.listen(config.appPort, () => console.log(`Приложение на порту: ${config.appPort}`));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});