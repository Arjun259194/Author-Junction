import UserModel, { User } from "@/database/model/User"
import { compare } from "bcrypt"

type TParam = { email: User["email"]; password: User["password"] }

export async function isValidUser({ email, password }: TParam) {
  const foundUser: User | undefined = await UserModel.findOne({ email: email }).exec()
  if (!foundUser) return { status: "not-found" } as const
  const isValidPassword: boolean = await compare(password, foundUser.password)
  if (!isValidPassword) return { status: "unauthorized" } as const
  return { status: "ok", user: foundUser } as const
}

//! not written
//todo set a return type
export async function createToken(payload: string | object | Buffer) {}
