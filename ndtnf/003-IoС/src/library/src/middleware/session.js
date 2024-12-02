import session from 'express-session'
import config from '../config/index.js'

const sessionSet = session({
  secret: config.authPass,
  resave: false,
  saveUninitialized: true,
})

export default sessionSet
