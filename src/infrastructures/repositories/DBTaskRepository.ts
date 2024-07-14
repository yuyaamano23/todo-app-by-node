import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Task } from "../../domain/models/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class DBTaskRepository implements TaskRepository {
	private repository: Repository<Task>;

	constructor() {
		this.repository = AppDataSource.getRepository(Task);
	}

	async save(task: Task): Promise<Task> {
		return this.repository.save(task);
	}

	async findAll(): Promise<Task[]> {
		return this.repository.find();
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id);
	}
}
