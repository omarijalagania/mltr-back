import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

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
