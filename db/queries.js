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
