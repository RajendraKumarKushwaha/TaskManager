const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = Schema({
    taskName: { type: String, required: true }, 
    isDone: { type: Boolean, required: true }
});

const taskModel = mongoose.model("todos",taskSchema);

module.exports = taskModel;