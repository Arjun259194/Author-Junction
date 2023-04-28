import { Document, model, models, Schema } from "mongoose"
import * as z from "zod"

const objectIDRegex = /^[a-f\d]{24}$/i

export const ZodUser = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  // password: z.string().min(8).max(50),
  password: z.string(),
  followers: z.array(z.string().regex(objectIDRegex)),
  following: z.array(z.string().regex(objectIDRegex)),
  role: z.enum(["READER", "AUTHOR"]),
})

type USchema = z.TypeOf<typeof ZodUser>

export interface User extends USchema, Document {}

const UserSchema: Schema<USchema> = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    followers: {
      type: [String],
      default: [],
      ref: "user",
    },
    following: {
      type: [String],
      default: [],
      ref: "user",
    },
    role: {
      type: String,
      enum: ["READER", "AUTHOR"],
      default: "READER",
    },
  },
  { collection: "User-Collection", timestamps: true }
)

const UserModel = models?.user || model<User>("user", UserSchema)

export default UserModel
