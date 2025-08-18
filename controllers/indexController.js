import { getAllItemsDB, getAllCategoriesDB, getItemsByCategoryDB, getAllCompaniesDB, getItemsByCompanyDB, addNewCategoryDB, addNewCompanyDB, addItemDB, getItemByIdDB, updateItemDB, getCategoryByIdDB, getCompanyByIdDB, getCategoryByIdFullDB, updateCategoryDB, getCompanyByIdFullDB, updateCompanyDB } from "../db/queries.js";

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
    const items = await getItemsByCategoryDB(categoryId);
    const categoryName = await getCategoryByIdDB(categoryId);
    res.render("sortedBy", { items: items, sortedByName: categoryName, sortedType: 'Category' });
}

export async function getAllCompanies(req, res){
    const companies = await getAllCompaniesDB();
    res.render("companies", { companies: companies });
}

export async function getItemsByCompany(req, res){
    const companyId = req.params.companyId;
    const items = await getItemsByCompanyDB(companyId);
    const companyName = await getCompanyByIdDB(companyId);
    res.render("sortedBy", { items: items, sortedByName: companyName, sortedType: 'Company' });
}

export async function addNewCategory(req, res){
    const category = req.body.categoryName;
    await addNewCategoryDB(category);
    res.redirect("/categories");
}

export async function addNewCompany(req, res){
    const company = req.body.companyName;
    await addNewCompanyDB(company);
    res.redirect("/companies");
}

export async function getAddItemForm(req, res){
    const categories = await getAllCategoriesDB();
    const companies = await getAllCompaniesDB();
    res.render("addItem", { categories: categories, companies: companies })
}

export async function addItem(req, res){
    const { itemName, itemPrice, category, company } = req.body;
    addItemDB(itemName, itemPrice, category, company);
    res.redirect("/");
}

export async function getUpdateItemForm(req, res) {
    const itemId = req.params.id;
    const item = await getItemByIdDB(itemId);
    const categories = await getAllCategoriesDB();
    const companies = await getAllCompaniesDB();
    res.render("updateItem", { item, categories, companies });
}

export async function postUpdateItemForm(req, res) {
    const itemId = req.params.id;
    const { itemName, itemPrice, category, company } = req.body;
    await updateItemDB(itemId, itemName, itemPrice, category, company);
    res.redirect("/");
}

export async function getUpdateCategoryForm(req, res) {
    const categoryId = req.params.id;
    const category = await getCategoryByIdFullDB(categoryId);
    res.render("updateCategory", { category });
}

export async function postUpdateCategoryForm(req, res) {
    const categoryId = req.params.id;
    const { categoryName } = req.body;
    await updateCategoryDB(categoryId, categoryName);
    res.redirect("/categories");
}

export async function getUpdateCompanyForm(req, res) {
    const companyId = req.params.id;
    const company = await getCompanyByIdFullDB(companyId);
    res.render("updateCompany", { company });
}

export async function postUpdateCompanyForm(req, res) {
    const companyId = req.params.id;
    const { companyName } = req.body;
    await updateCompanyDB(companyId, companyName);
    res.redirect("/companies");
}