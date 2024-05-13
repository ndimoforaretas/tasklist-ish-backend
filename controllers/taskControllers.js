import taskModel from "../model/taskModel.js";

// POST / CREATE

async function createTaskController(req, res) {
  try {
    const newTask = taskModel({
      task: req.body.task,
    });

    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.json(error);
  }
}

// GET ALL TASKS
async function getAllTasksController(req, res) {
  try {
    const allTaskItems = await taskModel.find({});
    res.status(200).json(allTaskItems);
  } catch (error) {
    res.json(error);
  }
}

// UPDATE A TASK
async function updateTaskController(req, res) {
  const updateId = req.params.taskId;
  try {
    const updatedItem = await taskModel.findByIdAndUpdate(
      updateId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.json(error);
  }
  //console.log(req.params.taskId);
}

// DELETE TASK
async function deleteTaskController(req, res) {
  const deleteId = req.params.taskId;
  try {
    await taskModel.findByIdAndDelete(deleteId);
    res.status(200).json("Task GELÖSCHT!");
  } catch (error) {
    res.json(error);
  }
}

// DELETE ALL TASKS

// async function deleteAllTasksController(req, res) {
//   try {
//     await taskModel.deleteMany({});
//     res.status(200).json("ALLE Tasks wurde GELÖSCHT!");
//   } catch (error) {
//     res.json(error);
//   }
// }

export {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  // deleteAllTasksController,
};
