import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		limit: "5mb",
		parameterLimit: 100000,
		extended: false,
	})
);
app.use(morgan("dev"));
app.use("/api", routes);

import mongoose from "mongoose";

mongoose
	.connect(process.env.MONGO_CONNECTION_URL)
	.then(() => {
		console.log("Database connected successfully");
		app.listen(
			process.env.PORT ? Number(process.env.PORT) : 8080,
			process.env.HOST ? process.env.HOST : "127.0.0.1",
			() =>
				console.log(
					`Listening on http://localhost:${
						process.env.PORT ? process.env.PORT : 8080
					}/`
				)
		);
	})
	.catch((error: any) => console.log(error.message));
