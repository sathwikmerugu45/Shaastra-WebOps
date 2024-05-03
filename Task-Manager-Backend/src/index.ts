import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import express from "express";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import cors = require("cors");
import { startStandaloneServer } from "@apollo/server/standalone";
import { TaskResolver } from "./resolvers/TaskResolver";
import dotenv from "dotenv"

dotenv.config()

const connectDB = new DataSource({
  type: "postgres",
  username:"postgres",
  password:"5799",
  // url: process.env.URL,
  database:"NewDB",
  port:5432,
  logging: true,
  synchronize: true,
  entities: ["./src/entity//*.ts"],
});


const main = async () => {
  connectDB
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized");
    })
    .catch((err) => {
      console.error("Data Source initialization error", err);
    });

  const schema = await buildSchema({
    resolvers: [TaskResolver] ,
  });

  const server = new ApolloServer({ schema });

  const app = express();

  app.use(
    "/graphql",
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is ready at ${url}`);
};

main();