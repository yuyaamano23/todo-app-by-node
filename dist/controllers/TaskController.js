"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const TaskService_1 = require("../services/TaskService");
class TaskController {
    constructor(taskRepository) {
        this.createTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            const task = yield this.taskService.createTask(title, description);
            res.status(201).json(task);
        });
        this.getAllTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskService.getAllTasks();
            res.status(200).json(tasks);
        });
        this.deleteTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.taskService.deleteTask(Number(id));
            res.status(204).send();
        });
        this.taskService = new TaskService_1.TaskService(taskRepository);
    }
}
exports.TaskController = TaskController;
