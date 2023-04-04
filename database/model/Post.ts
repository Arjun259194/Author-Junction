import { Document, Schema, model, models } from "mongoose"

export interface Post extends Document {
  title: string
  creator: Schema.Types.ObjectId
  likes: number
  shares: number
  //comments for future
  content: string
}

interface PostSchema {
  title: string
  creator: Schema.Types.ObjectId
  likes: number
  shares: number
  //comments for future
  content: string
}

const postSchema: Schema<PostSchema> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "Post-Collection" }
)

const PostModel = models.post || model<Post>("post", postSchema)

export default PostModel
