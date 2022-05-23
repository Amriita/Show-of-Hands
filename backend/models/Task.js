const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    Name: String,
    Progress:Boolean,
    Cmpleted:Boolean,
    DueDate: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }
);

module.exports = mongoose.model("Task", TaskSchema);
