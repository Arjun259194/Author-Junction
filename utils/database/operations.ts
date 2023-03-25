import UserModel, { User } from "@/model/User"
import { genSalt, hash } from "bcrypt"
import { userData } from "../types"

export async function createUser({ username, email, password }: userData): Promise<User> {
  const saltRound = 10
  const salt = await genSalt(saltRound)
  const newUser: User = new UserModel({
    username,
    email,
    password: await hash(password, salt),
  })
  return newUser
}
