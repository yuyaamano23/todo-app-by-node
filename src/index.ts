import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { TaskController } from "./controllers/TaskController";
import { MySQLTaskRepository } from "./infrastructures/repositories/MySQLTaskRepository";

const app = express();
app.use(express.json());

const connectWithRetry = () => {
	AppDataSource.initialize()
		.then(() => {
			const taskRepository = new MySQLTaskRepository();
			const taskController = new TaskController(taskRepository);

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
