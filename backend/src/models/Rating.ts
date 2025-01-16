import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity("ratings")
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number;

    @Column()
    recipe_id: number;

    @Column()
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Recipe, recipe => recipe.ratings)
    recipe: Recipe;

    @ManyToOne(() => User, user => user.ratings)
    user: User;
} 