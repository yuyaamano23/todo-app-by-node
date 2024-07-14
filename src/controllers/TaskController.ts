import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
	private taskService: TaskService;

	constructor(taskService: TaskService) {
		this.taskService = taskService;
	}

	createTask = async (req: Request, res: Response) => {
		const { title, description } = req.body;
		const task = await this.taskService.createTask(title, description);
		res.status(201).json(task);
	};

	getAllTasks = async (req: Request, res: Response) => {
		try {
			const tasks = await this.taskService.getAllTasks();
			res.status(200).json(tasks);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	};

	getTask = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const task = await this.taskService.getTask(Number(id));
			res.status(200).json(task);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	};

	deleteTask = async (req: Request, res: Response) => {
		const { id } = req.params;
		await this.taskService.deleteTask(Number(id));
		res.status(204).send();
	};
}
