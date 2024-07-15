import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { container } from "tsyringe";
import "./infrastructures/DIContainer"; // DIコンテナの設定をインポート
import { TaskController } from "./controllers/TaskController";

const app = express();
app.use(express.json());

const connectWithRetry = () => {
	if (!AppDataSource.isInitialized) {
		AppDataSource.initialize()
			.then(() => {
				console.log("Database connection established successfully");

				// DIコンテナからTaskControllerのインスタンスを取得
				const taskController = container.resolve(TaskController);

				app.post("/tasks", (req, res) => taskController.createTask(req, res));
				app.get("/tasks", (req, res) => taskController.getAllTasks(req, res));
				app.get("/tasks/:id", (req, res) => taskController.getTask(req, res));
				app.delete("/tasks/:id", (req, res) =>
					taskController.deleteTask(req, res)
				);

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
	}
};

connectWithRetry();
