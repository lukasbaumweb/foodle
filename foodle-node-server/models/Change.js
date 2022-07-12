const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChangeSchema = new Schema(
  {
    version: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autoPopulate: true,
    },
    changes: [{ type: Object }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Change = mongoose.model("Change", ChangeSchema);
ChangeSchema.plugin(require("mongoose-autopopulate"));

module.exports = Change;
