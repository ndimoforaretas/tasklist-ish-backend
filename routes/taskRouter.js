import express from "express";

import {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  //deleteAllTasksController,
} from "../controllers/taskControllers.js";

const taskRouter = express.Router();

// get / read
taskRouter.get("/", getAllTasksController);

// create / post
taskRouter.post("/", createTaskController);

//update
taskRouter.put("/:taskId", updateTaskController);

// Delete one
taskRouter.delete("/:taskId", deleteTaskController);

// delete all
//taskRouter.delete("/", deleteAllTasksController);

export default taskRouter;
