import { Router } from "express";
import { getAllCompanies, getItemsByCompany } from "../controllers/indexController.js";

const companiesRouter = Router();

companiesRouter.get("/", getAllCompanies);
companiesRouter.get("/:companyId", getItemsByCompany)

export default companiesRouter;
