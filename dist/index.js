"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const TaskController_1 = require("./controllers/TaskController");
const MySQLTaskRepository_1 = require("./infrastructures/repositories/MySQLTaskRepository");
const app = (0, express_1.default)();
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(() => {
    const taskRepository = new MySQLTaskRepository_1.MySQLTaskRepository();
    const taskController = new TaskController_1.TaskController(taskRepository);
    app.post("/tasks", taskController.createTask);
    app.get("/tasks", taskController.getAllTasks);
    app.delete("/tasks/:id", taskController.deleteTask);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error(error);
});
