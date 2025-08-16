import express, { urlencoded } from "express";
import "dotenv/config";
import indexRouter from "./routes/indexRouter.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
