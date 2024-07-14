import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Task } from "../../domain/models/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class DBTaskRepository implements TaskRepository {
	private repository: Repository<Task>;

	constructor() {
		this.repository = AppDataSource.getRepository(Task);
	}

	async save(task: Task) {
		return this.repository.save(task);
	}

	async findAll() {
		return this.repository.find();
	}

	async findById(id: number) {
		return this.repository.findOne({ where: { id } });
	}

	async delete(id: number) {
		await this.repository.delete(id);
	}
}
