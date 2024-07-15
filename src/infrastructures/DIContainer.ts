import { container } from "tsyringe";
import { TaskRepository } from "../domain/repositories/TaskRepository";
import { DBTaskRepository } from "./repositories/DBTaskRepository";
import { TaskService } from "../services/TaskService";

// TaskRepositoryのインターフェースに対してDBTaskRepositoryを登録
container.register<TaskRepository>("TaskRepository", {
	useClass: DBTaskRepository,
});

// TaskServiceを登録
container.register<TaskService>(TaskService, {
	useClass: TaskService,
});
