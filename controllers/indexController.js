import { getAllItemsDB, getAllCategoriesDB, getItemsByCategoryDB, getAllCompaniesDB, getItemsByCompanyDB } from "../db/queries.js"

export async function getAllItems(req, res){
    const items = await getAllItemsDB();
    res.render("index", { items: items });
}

export async function getAllCategories(req, res){
    const categories = await getAllCategoriesDB();
    res.render("categories", { categories: categories });
}

export async function getItemsByCategory(req, res){
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    const items = await getItemsByCategoryDB(categoryId);
    res.render("sortedBy", { items: items });
}

export async function getAllCompanies(req, res){
    const companies = await getAllCompaniesDB();
    res.render("companies", { companies: companies });
}

export async function getItemsByCompany(req, res){
    const companyId = req.params.companyId;
    console.log(companyId);
    const items = await getItemsByCompanyDB(companyId);
    res.render("sortedBy", { items: items });
}
