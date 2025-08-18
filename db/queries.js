import { pool } from "./pool.js";

export async function getAllItemsDB(){
    const { rows } = await pool.query("SELECT * FROM items ORDER BY item_id"); 
    return rows; 
};

export async function getAllCategoriesDB(){
    const { rows } = await pool.query("SELECT * FROM categories ORDER BY category_id");
    return rows;
}

export async function getItemsByCategoryDB(categoryId){
    const { rows } = await pool.query("SELECT * FROM items WHERE items.category_id = $1", [categoryId]);
    return rows;
}

export async function getAllCompaniesDB(){
    const { rows } = await pool.query("SELECT * FROM companies ORDER BY company_id");
    return rows;
}

export async function getItemsByCompanyDB(companyId){
    const { rows } = await pool.query("SELECT * FROM items WHERE items.company_id = $1", [companyId]);
    return rows;
}

export async function addNewCategoryDB(categoryName){
     await pool.query("INSERT INTO categories (category_name) VALUES ($1)", [categoryName]);
}

export async function addNewCompanyDB(companyName){
     await pool.query("INSERT INTO companies (company_name) VALUES ($1)", [companyName]);
}

export async function addItemDB(itemName, itemPrice, category, company){
    await pool.query("INSERT INTO items (item_name, unit_price, category_id, company_id) VALUES ($1, $2, $3, $4)", [itemName, itemPrice, category, company])
}

export async function getItemByIdDB(itemId) {
    const { rows } = await pool.query("SELECT * FROM items WHERE item_id = $1", [itemId]);
    return rows[0];
}

export async function updateItemDB(itemId, itemName, itemPrice, category, company) {
    await pool.query(
        "UPDATE items SET item_name = $1, unit_price = $2, category_id = $3, company_id = $4 WHERE item_id = $5",
        [itemName, itemPrice, category, company, itemId]
    );
}

export async function getCategoryByIdFullDB(categoryId) {
    const { rows } = await pool.query("SELECT * FROM categories WHERE category_id = $1", [categoryId]);
    return rows[0];
}

export async function updateCategoryDB(categoryId, categoryName) {
    await pool.query("UPDATE categories SET category_name = $1 WHERE category_id = $2", [categoryName, categoryId]);
}

export async function getCompanyByIdFullDB(companyId) {
    const { rows } = await pool.query("SELECT * FROM companies WHERE company_id = $1", [companyId]);
    return rows[0];
}

export async function updateCompanyDB(companyId, companyName) {
    await pool.query("UPDATE companies SET company_name = $1 WHERE company_id = $2", [companyName, companyId]);
}
export async function getCategoryByIdDB(categoryId) {
    const { rows } = await pool.query("SELECT category_name FROM categories WHERE category_id = $1", [categoryId]);
    return rows[0]?.category_name;
}

export async function getCompanyByIdDB(companyId) {
    const { rows } = await pool.query("SELECT company_name FROM companies WHERE company_id = $1", [companyId]);
    return rows[0]?.company_name;
}