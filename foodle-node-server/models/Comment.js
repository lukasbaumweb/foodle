const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    body: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autoPopulate: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
CommentSchema.plugin(require("mongoose-autopopulate"));

module.exports = Comment;
