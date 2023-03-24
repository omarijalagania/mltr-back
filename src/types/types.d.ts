import { Session } from "express-session"

export interface JwtStrategyOptions {
  jwtFromRequest: ExtractJwt.FromExtractFunction
  secretOrKey: string
}

export type Users = {
  _id?: string
  email?: string
  googleId?: string
  sex?: string
  birth?: string
  height?: number
  is_ft_heigth?: boolean
  body_type?: string
  physical_activities?: string
  weight?: number
  is_ft_weight?: boolean
  status?: string
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
