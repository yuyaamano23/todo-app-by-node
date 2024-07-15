import { injectable } from "tsyringe";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/models/Task";

@injectable()
export class InMemoryTaskRepository implements TaskRepository {
	private tasks: Task[] = [];
	private idCounter = 1;

	async save(task: Task) {
		if (!task.id) {
			task.id = this.idCounter++;
			this.tasks.push(task);
		} else {
			const index = this.tasks.findIndex((t) => t.id === task.id);
			if (index !== -1) {
				this.tasks[index] = task;
			}
		}
		return task;
	}

	async findAll() {
		return this.tasks;
	}

	async findById(id: number) {
		return this.tasks.find((task) => task.id === id) || null;
	}

	async delete(id: number) {
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}
}
