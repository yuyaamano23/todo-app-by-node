import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { TaskRepository } from "../domain/repositories/TaskRepository";

export class TaskController {
	private taskService: TaskService;

	constructor(taskRepository: TaskRepository) {
		this.taskService = new TaskService(taskRepository);
	}

	createTask = async (req: Request, res: Response) => {
		const { title, description } = req.body;
		const task = await this.taskService.createTask(title, description);
		res.status(201).json(task);
	};

	getAllTasks = async (req: Request, res: Response) => {
		const tasks = await this.taskService.getAllTasks();
		res.status(200).json(tasks);
	};

	deleteTask = async (req: Request, res: Response) => {
		const { id } = req.params;
		await this.taskService.deleteTask(Number(id));
		res.status(204).send();
	};
}
