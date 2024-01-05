import type { Application, Request } from 'express'
// @ts-ignore
import expressSession from 'express-session'
// @ts-ignore
import expressSessionStore from 'sessionstore'

import { SessionData } from './sessionStore.types'

const session: SessionData = {}

export class SessionStore {
  setup(app: Application) {
    app.use(
      expressSession({
        secret: 'aim',
        saveUninitialized: true,
        resave: false,
        store: expressSessionStore.createSessionStore({
          type: 'inmemory',
          host: 'localhost',
          // TODO: add support for different session ports
          port: 8000,
        }),
      }),
    )
  }

  set(req: Request, key: string, value: string | number | boolean, isGenericSession?: boolean) {
    if (!req.session && !isGenericSession) return
    const sessionId = isGenericSession ? '000' : req.session.id
    if (!session[sessionId]) session[sessionId] = {}
    // Wrong interface, ignore - value can be boolean, number and string!
    // @ts-ignore
    session[sessionId][key] = value
  }

  get(req: Request, key: string) {
    const isGenericSession = req.headers.aim_generic_session || null
    if (!req.session && !isGenericSession) return null
    const sessionId = isGenericSession ? '000' : req.session.id
    if (!session[sessionId]) return null
    return session[sessionId][key]
  }
}

export default new SessionStore()
