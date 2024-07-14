import { Task } from "../models/Task";

export interface TaskRepository {
	save(task: Task): Promise<Task>;
	findAll(): Promise<Task[]>;
	delete(id: number): Promise<void>;
}
