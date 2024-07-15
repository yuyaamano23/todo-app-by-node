import { DataSource } from "typeorm";
import { Task } from "./domain/models/Task";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 3306,
	username: process.env.DB_USERNAME || "root",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_NAME || "todo_db",
	synchronize: true,
	logging: false,
	entities: [Task],
	migrations: [],
	subscribers: [],
});
