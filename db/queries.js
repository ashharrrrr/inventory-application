import { pool } from "./pool.js";

export async function getAllItemsDB(){
   const { rows } = await pool.query("SELECT * FROM items"); 
   return rows; 
};

export async function getALLItemsCategoryDB(categoryId){
    const { rows } = await pool.query("SELECT * FROM items WHERE items.category_id = $1", [categoryId]);
    return rows;
}
