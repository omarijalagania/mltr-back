import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(403).send("not authorized")
  } else {
    const [, token] = authorization.trim().split(" ")
    if (!token) {
      res.status(403).send("empty token")
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if (verified) {
      next()
    } else {
      res.status(403).send("token not verified")
    }
  }
}

export default authMiddleware

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(403).json({ message: "not authorized" })
  } else {
    const [, token] = authorization.trim().split(" ")
    if (!token) {
      res.status(403).json({ message: "empty token" })
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if (verified) {
      if ((verified as JwtPayload).isAdmin) {
        next()
      } else {
        res.status(403).json({ message: "not admin" })
      }
    } else {
      res.status(403).json({ message: "token not verified" })
    }
  }
}
