import express, { Application } from "express";
import morgan from "morgan";

const app: Application = express();

const isProductionENV = process.env.NODE_ENV === "production";

if (!isProductionENV) app.use(morgan("dev"));

export { app };