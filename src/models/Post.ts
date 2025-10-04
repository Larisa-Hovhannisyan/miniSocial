import { Schema, model, Document, Types } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
  text: string;
  images: string[];
  likes: number;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, default: "" },
  images: [{ type: String }],
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default model<IPost>("Post", PostSchema);


