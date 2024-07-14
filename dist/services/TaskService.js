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
exports.TaskService = void 0;
const Task_1 = require("../domain/models/Task");
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    createTask(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new Task_1.Task();
            task.title = title;
            task.description = description;
            return this.taskRepository.save(task);
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.findAll();
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskRepository.delete(id);
        });
    }
}
exports.TaskService = TaskService;
