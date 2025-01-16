import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Recipe } from "../models/Recipe";
import { Category } from "../models/Category";
import { Comment } from "../models/Comment";
import { Rating } from "../models/Rating";
import { environment } from "./environment";
import { seedCategories } from "../utils/seedCategories";
import { seedRecipes } from "../utils/seedRecipes";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: environment.dbHost,
    port: environment.dbPort,
    username: environment.dbUser,
    password: environment.dbPassword,
    database: environment.dbName,
    synchronize: environment.nodeEnv === "development",
    logging: true,
    entities: [User, Recipe, Category, Comment, Rating],
    subscribers: [],
    migrations: [],
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        // Seed initial data
        await seedCategories();
        await seedRecipes();
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
        console.error("Connection details:", {
            host: environment.dbHost,
            port: environment.dbPort,
            user: environment.dbUser,
            database: environment.dbName
        });
        throw err;
    }
}; 