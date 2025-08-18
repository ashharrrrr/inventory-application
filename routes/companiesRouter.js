import { Router } from "express";
import { getAllCompanies, getItemsByCompany, addNewCompany } from "../controllers/indexController.js";

const companiesRouter = Router();

companiesRouter.get("/", getAllCompanies);
companiesRouter.get("/:companyId", getItemsByCompany)
companiesRouter.get("/new", (req, res) => res.render("addCompanyForm"))
companiesRouter.post("/new", addNewCompany)

export default companiesRouter;
