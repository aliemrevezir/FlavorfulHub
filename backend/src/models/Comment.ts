import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column()
    recipe_id: number;

    @Column()
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Recipe, recipe => recipe.comments)
    recipe: Recipe;

    @ManyToOne(() => User, user => user.comments)
    user: User;
} 