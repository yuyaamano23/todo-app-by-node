import { container } from "tsyringe";
import { TaskRepository } from "../domain/repositories/TaskRepository";
import { DBTaskRepository } from "./repositories/DBTaskRepository";
import { InMemoryTaskRepository } from "./repositories/InMemoryTaskRepository";
import { TaskService } from "../services/TaskService";

// 使用するリポジトリを切り替え
const useInMemoryRepository = true; // trueにするとInMemoryTaskRepositoryを使用

if (useInMemoryRepository) {
	container.registerSingleton<TaskRepository>(
		"TaskRepository",
		InMemoryTaskRepository
	);
} else {
	container.registerSingleton<TaskRepository>(
		"TaskRepository",
		DBTaskRepository
	);
}

container.registerSingleton<TaskService>(TaskService);
