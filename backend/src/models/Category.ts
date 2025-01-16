import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Recipe } from "./Recipe";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: false
    })
    name: string;

    @Column({
        type: "text",
        nullable: true
    })
    description: string;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "URL to the category's image"
    })
    image_url: string;

    @OneToMany(() => Recipe, recipe => recipe.category)
    recipes: Recipe[];
} 