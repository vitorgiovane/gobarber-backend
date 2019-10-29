import jwt from 'jsonwebtoken'

import User from '../models/User'
import { secret, expiresIn } from '../../config/auth'

class SessionController {
  async store(request, response) {
    const { email, password } = request.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return response.status(401).json({ error: 'Wrong credentials!' })
    }
    const checkPassword = await user.checkPassword(password)
    if (!checkPassword) {
      return response.status(401).json({ error: 'Wrong credentials!' })
    }

    const { id, name } = user
    const token = jwt.sign({ id }, secret, { expiresIn })

    return response.json({
      user: {
        id,
        email,
        name
      },
      token
    })
  }
}

export default new SessionController()
