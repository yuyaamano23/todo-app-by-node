import { Task } from "../domain/models/Task";
import { TaskRepository } from "../domain/repositories/TaskRepository";

export class TaskService {
	private taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async createTask(title: string, description: string) {
		const task = new Task();
		task.title = title;
		task.description = description;
		return this.taskRepository.save(task);
	}

	async getAllTasks() {
		return this.taskRepository.findAll();
	}

	async getTask(id: number) {
		return this.taskRepository.findById(id);
	}

	async deleteTask(id: number) {
		await this.taskRepository.delete(id);
	}
}
