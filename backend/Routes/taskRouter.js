const { createTask, fetchAllTask, updateTaskById, DeleteTaskById } = require("../Controllers/taskController");

const router = require("express").Router();



// to get all the task
router.get("/", fetchAllTask);

// to create a task
router.post("/", createTask);

// to updata a task
router.put("/:id", updateTaskById);

// to delete a task
router.delete("/:id", DeleteTaskById);

module.exports = router;