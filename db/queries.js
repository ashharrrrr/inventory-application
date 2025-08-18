import { pool } from "./pool.js";

export async function getAllItemsDB(){
   const { rows } = await pool.query("SELECT * FROM items"); 
   return rows; 
};

export async function getAllCategoriesDB(){
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

export async function getItemsByCategoryDB(categoryId){
    const { rows } = await pool.query("SELECT * FROM items WHERE items.category_id = $1", [categoryId]);
    return rows;
}

export async function getAllCompaniesDB(){
    const { rows } = await pool.query("SELECT * FROM companies");
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
