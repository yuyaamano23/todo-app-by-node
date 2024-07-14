import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { TaskController } from "./controllers/TaskController";
import { TaskService } from "./services/TaskService";
import { DBTaskRepository } from "./infrastructures/repositories/DBTaskRepository";

const app = express();
app.use(express.json());

const connectWithRetry = () => {
	AppDataSource.initialize()
		.then(() => {
			console.log("Database connection established successfully");

			// ここでリポジトリのインスタンスを作成
			const taskRepository = new DBTaskRepository();

			// サービスのインスタンスを作成
			const taskService = new TaskService(taskRepository);

			// コントローラーにサービスを注入
			const taskController = new TaskController(taskService);

			app.post("/tasks", taskController.createTask);
			app.get("/tasks", taskController.getAllTasks);
			app.delete("/tasks/:id", taskController.deleteTask);

			const PORT = process.env.PORT || 3000;
			app.listen(PORT, () => {
				console.log(`Server is running on port ${PORT}`);
			});
		})
		.catch((error: Error) => {
			console.error(
				"Failed to connect to the database. Retrying in 5 seconds...",
				error
			);
			setTimeout(connectWithRetry, 5000);
		});
};

connectWithRetry();
