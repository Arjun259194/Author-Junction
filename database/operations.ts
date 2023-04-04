import UserModel, { User } from "@/database/model/User"
import { hash } from "bcrypt"

type UserData = {
  username: User["username"]
  email: User["email"]
  password: User["password"]
}

export async function createUser({
  username,
  email,
  password,
}: UserData): Promise<User> {
  const newUser: User = new UserModel({
    username,
    email,
    password: await hash(password, 10),
  })
  return newUser
}
