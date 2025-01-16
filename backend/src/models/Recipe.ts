import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

export enum DifficultyLevel {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard'
}

@Entity("recipes")
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column()
    image_url: string;

    @Column()
    prep_time: string;

    @Column()
    servings: number;

    @Column("decimal", { precision: 2, scale: 1, default: 0 })
    rating: number;

    @Column({
        type: "enum",
        enum: DifficultyLevel,
        default: DifficultyLevel.MEDIUM
    })
    difficulty_level: DifficultyLevel;

    @ManyToOne(() => Category, category => category.recipes)
    category: Category;

    @Column()
    category_id: number;

    @ManyToOne(() => User, user => user.recipes)
    author: User;

    @Column()
    author_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 