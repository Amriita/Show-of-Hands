const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    NotAccepted:Boolean,
    Accepted:Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }
);

module.exports = mongoose.model("Proposal", proposalSchema);
