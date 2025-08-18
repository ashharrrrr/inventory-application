import { Router } from "express";
import { getAllItems, getAddItemForm, addItem} from "../controllers/indexController.js";
import categoriesRouter from "./categoriesRouter.js";
import companiesRouter from "./companiesRouter.js";

const indexRouter = Router();

indexRouter.get("/", getAllItems);
indexRouter.use("/categories", categoriesRouter);
indexRouter.use("/companies", companiesRouter);
indexRouter.get("/item/add", getAddItemForm);
indexRouter.post("/item/add", addItem);

export default indexRouter;
