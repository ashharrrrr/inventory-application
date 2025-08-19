import { Router } from "express";
import { getAllCategories, getItemsByCategory, postAddCategoryForm, getUpdateCategoryForm, postUpdateCategoryForm, deleteCategory } from "../controllers/indexController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/category/:categoryId", getItemsByCategory)
categoriesRouter.get("/new", (req, res) => res.render("addCategoryForm"))
categoriesRouter.post("/new", postAddCategoryForm)
categoriesRouter.get("/update/:id", getUpdateCategoryForm);
categoriesRouter.post("/update/:id", postUpdateCategoryForm);
categoriesRouter.post("/delete/:id", deleteCategory);

export default categoriesRouter;
