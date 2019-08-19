import { Router } from 'express'
import User from './app/models/User'

const routes = Router()
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Vitor Giovane',
    email: 'vitorgpalves@gmail.com',
    password: '123456'
  })
  return res.json(user)
})

export default routes
