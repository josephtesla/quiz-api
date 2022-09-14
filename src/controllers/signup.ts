import bcrypt from 'bcrypt'
import { generateAccessToken, WrapperArguments } from "../helpers";
import { BadRequestError } from '../helpers/error';
import { User } from "../models/user";

export const signup = async ({ input }: WrapperArguments) => {
  const { name, email, password } = input
  
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new BadRequestError("Email address already in use!") 
  }

  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = new User({
    name,
    email,
    password: hashedPassword
  })

  await user.save()
  const { id: userId } = user
  const token = generateAccessToken(user)
  return {
    token,
    userId
  }
}
