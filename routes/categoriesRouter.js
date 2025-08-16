import { Router } from "express";
import { getAllCategories, getItemsByCategory } from "../controllers/indexController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:categoryId", getItemsByCategory)

export default categoriesRouter;
