import UserModel, { User } from "@/database/model/User";
import jwt from 'jsonwebtoken'
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextApiRequest } from "next";
import { type } from "os";

/**
 * Parameter type for isValidUser function
 */
type TUserData = { email: User["email"]; password: User["password"] };

/**
 * Checks if the provided email and password combination match a user in the database.
 * @param {TUserData} param An object with email and password properties
 * @returns {Promise<{status: "not-found"}>} If no user is found with the provided email
 * @returns {Promise<{status: "unauthorized"}>} If the provided password does not match the found user's password
 * @returns {Promise<{status: "ok", user: User}>} If the provided email and password match a user in the database
 */

export async function isValidUser({ email, password }: TUserData) {
  const foundUser: User | undefined = await UserModel.findOne({
    email: email,
  }).exec();
  if (!foundUser) return { status: "not-found" } as const;
  const isValidPassword: boolean = await compare(password, foundUser.password);
  if (!isValidPassword) return { status: "unauthorized" } as const;
  return { status: "ok", user: foundUser } as const;
}

/**
 * Creates a token for the provided payload using a secret key from the environment variables.
 * @param {string | object | Buffer} payload The data to be included in the token
 * @returns {string} A token string signed with the secret key
 */

export function createToken(payload: string | object | Buffer): string {
  const secretKey = process.env.SECRET_KEY!;
  const TOKEN = sign(payload, secretKey);
  return TOKEN;
}

export function getUserIdFromCookie(req:NextApiRequest): string | undefined {
  const token = req.cookies.accessToken
  if (!token) return undefined
  const payload = jwt.decode(token) 
  if (!payload) return undefined
  if(typeof payload === "string") return payload
  return payload.id

}