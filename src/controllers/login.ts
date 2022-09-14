import bcrypt from 'bcrypt'
import { generateAccessToken, WrapperArguments } from "../helpers";
import { NotAuthenticatedError } from '../helpers/error';
import { User } from "../models/user";

export const login = async ({ input }: WrapperArguments) => {
  const { email, password } = input
  const existingUser = await User.findOne({ email }).select("+password")

  if (!existingUser || !bcrypt.compareSync(password, existingUser.password)){
    throw new NotAuthenticatedError("Invalid email address or password")
  }

  const token = generateAccessToken(existingUser)
  const { id: userId } = existingUser
  return {
    token,
    userId
  }
}
