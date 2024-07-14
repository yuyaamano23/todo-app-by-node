import { Task } from "../models/Task";

export interface TaskRepository {
	save(task: Task): Promise<Task>;
	findAll(): Promise<Task[]>;
	findById(id: number): Promise<Task | null>;
	delete(id: number): Promise<void>;
}
