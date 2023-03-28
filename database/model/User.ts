import { Document, model, models, Schema } from "mongoose"

export interface User extends Document {
  username: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { collection: "User-Collection" }
)

const UserModel = models.user || model<User>("user", UserSchema)

export default UserModel
