import session from 'express-session'
import config from '../config/index.js'

declare module 'express-session' {
  interface Session {
      messageUserSignup?: string
      messageBook?: string
      messages: string[]
  }
}

const sessionSet = session({
  secret: config.authPass,
  resave: false,
  saveUninitialized: true,
})

export { sessionSet }
