import { Router } from "express";
import { getAllCategories, getItemsByCategory, addNewCategory } from "../controllers/indexController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/category/:categoryId", getItemsByCategory)
categoriesRouter.get("/new", (req, res) => res.render("addCategoryForm"))
categoriesRouter.post("/new", addNewCategory)

export default categoriesRouter;
