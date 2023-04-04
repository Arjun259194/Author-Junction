import { Document, model, models, Schema } from "mongoose"

export interface User extends Document {
  username: string
  email: string
  password: string
  followers: Schema.Types.ObjectId[]
  following: Schema.Types.ObjectId[]
  role: "READER" | "AUTHOR"
}

interface USchema {
  username: string
  email: string
  password: string
  followers: Schema.Types.ObjectId[]
  following: Schema.Types.ObjectId[]
  role: "READER" | "AUTHOR"
}

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
      type: [Schema.Types.ObjectId],
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    role: {
      type: String,
      enum: ["READER", "AUTHOR"],
      default: "READER",
    },
  },
  { collection: "User-Collection" }
)

const UserModel = models.user || model<User>("user", UserSchema)

export default UserModel
