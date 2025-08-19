import { Router } from "express";
import { getAllCompanies, getItemsByCompany, postAddCompanyForm, getUpdateCompanyForm, postUpdateCompanyForm, deleteCompany } from "../controllers/indexController.js";

const companiesRouter = Router();

companiesRouter.get("/", getAllCompanies);
companiesRouter.get("/:companyId", getItemsByCompany)
companiesRouter.get("/new", (req, res) => res.render("addCompanyForm"))
companiesRouter.post("/new", postAddCompanyForm)
companiesRouter.get("/update/:id", getUpdateCompanyForm);
companiesRouter.post("/update/:id", postUpdateCompanyForm);
companiesRouter.post("/delete/:id", deleteCompany);

export default companiesRouter;
