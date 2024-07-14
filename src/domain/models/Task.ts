import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	constructor(title: string = "", description: string = "") {
		this.id = 0;
		this.title = title;
		this.description = description;
	}
}
