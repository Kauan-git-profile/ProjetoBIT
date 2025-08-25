const mongoose = require("mongoose");
const Task = mongoose.model("Task", {
  title: String,
  description: String,
  completed: Boolean,
  priority: Number,
  dueDate: Date,
});

//exportando o model Person
module.exports = Task;
