import { Router } from "express";
import { getAllItems } from "../controllers/indexController.js";
import categoriesRouter from "./categoriesRouter.js";
import companiesRouter from "./companiesRouter.js";

const indexRouter = Router();

indexRouter.get("/", getAllItems);
indexRouter.use("/categories", categoriesRouter);
indexRouter.use("/companies", companiesRouter);

export default indexRouter;
