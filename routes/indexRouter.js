import { Router } from "express";
import { getAllItems, getAddItemForm, postAddItemForm, getUpdateItemForm, postUpdateItemForm, deleteItem } from "../controllers/indexController.js";
import categoriesRouter from "./categoriesRouter.js";
import companiesRouter from "./companiesRouter.js";

const indexRouter = Router();

indexRouter.get("/", getAllItems);

indexRouter.use("/categories", categoriesRouter);
indexRouter.use("/companies", companiesRouter);

indexRouter.get("/item/add", getAddItemForm);
indexRouter.post("/item/add", postAddItemForm);

indexRouter.get("/item/update/:id", getUpdateItemForm);
indexRouter.post("/item/update/:id", postUpdateItemForm);

indexRouter.post("/item/delete/:id", deleteItem);

export default indexRouter;
