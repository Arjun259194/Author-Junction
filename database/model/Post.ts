import { Document, Schema, model, models } from "mongoose"
import z from "zod"

const objectIDRegex = /^[a-f\d]{24}$/i

export const ZodPost = z.object({
  title: z.string().nonempty(),
  creator: z.string().regex(objectIDRegex),
  likes: z.array(z.string().regex(objectIDRegex)),
  shares: z.number().int().default(0),
  description: z.string().nonempty(),
  content: z.string().nonempty(),
})

type PostSchema = z.infer<typeof ZodPost>

export interface Post extends PostSchema, Document {}

const postSchema: Schema<PostSchema> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      ref: "user",
      required: true,
    },
    likes: {
      type: [String],
      ref: "user",
      default: [],
    },
    shares: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "Post-Collection", timestamps: true }
)

const PostModel = models?.post || model<Post>("post", postSchema)

export default PostModel
