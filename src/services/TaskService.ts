import { Task } from "../domain/models/Task";
import { TaskRepository } from "../domain/repositories/TaskRepository";

export class TaskService {
	private taskRepository: TaskRepository;

	constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	async createTask(title: string, description: string): Promise<Task> {
		const task = new Task();
		task.title = title;
		task.description = description;
		return this.taskRepository.save(task);
	}

	async getAllTasks(): Promise<Task[]> {
		return this.taskRepository.findAll();
	}

	async deleteTask(id: number): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
