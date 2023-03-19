import express from 'express'
import authRoute from './auth'

const router = express.Router()

router.use(authRoute)

export default router
