import { DataSource } from "typeorm";
import { Task } from "./domain/models/Task";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: true,
	entities: [Task],
	subscribers: [],
	migrations: [],
});
