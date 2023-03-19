import { Session } from "express-session"

export interface JwtStrategyOptions {
  jwtFromRequest: ExtractJwt.FromExtractFunction
  secretOrKey: string
}

export type Users = {
  _id?: string
  name?: string
  email?: string
  googleId?: string
}

export type Sessions = {
  destroy(arg0: (err: any) => void): unknown
  cookie?: {
    path?: string
    _expires?: undefined
    originalMaxAge?: number | null
    httpOnly?: boolean
  }
  passport?: Users
}
