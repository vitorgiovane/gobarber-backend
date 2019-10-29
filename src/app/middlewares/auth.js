import jwt from "jsonwebtoken"
import {promisify} from "util"

import {secret} from "../../config/auth"

export default async (request, response, next) => {
  const { authorization } = request.headers

  if(!authorization){
    return response.status(401).json({error: "Token not provided."})
  }

  const [, token] = authorization.split(" ")

  try {
    const {id:userId} = await promisify(jwt.verify)(token, secret)
    request.userId = userId
    next()
  } catch (error) {
    return response.status(401).json({error: "Invalid token."})
  }
}
