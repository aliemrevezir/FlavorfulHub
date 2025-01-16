import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { Comment } from "./Comment";
import { Rating } from "./Rating";

export enum UserType {
    DEFAULT_USER = 'default_user',
    ADMIN = 'admin'
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.DEFAULT_USER
    })
    user_type: UserType;

    @Column({ nullable: true })
    profile_image: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Recipe, recipe => recipe.author)
    recipes: Recipe[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[];
} 