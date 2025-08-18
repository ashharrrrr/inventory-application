import { Router } from "express";
import { getAllItems, getAddItemForm, addItem, getUpdateItemForm, postUpdateItemForm, getUpdateCategoryForm, postUpdateCategoryForm, getUpdateCompanyForm, postUpdateCompanyForm } from "../controllers/indexController.js";
import categoriesRouter from "./categoriesRouter.js";
import companiesRouter from "./companiesRouter.js";

const indexRouter = Router();

indexRouter.get("/", getAllItems);

indexRouter.use("/categories", categoriesRouter);
indexRouter.use("/companies", companiesRouter);

indexRouter.get("/item/add", getAddItemForm);
indexRouter.post("/item/add", addItem);

indexRouter.get("/update/item/:id", getUpdateItemForm);
indexRouter.post("/update/item/:id", postUpdateItemForm);

indexRouter.get("/update/category/:id", getUpdateCategoryForm);
indexRouter.post("/update/category/:id", postUpdateCategoryForm);

indexRouter.get("/update/company/:id", getUpdateCompanyForm);
indexRouter.post("/update/company/:id", postUpdateCompanyForm);

export default indexRouter;
