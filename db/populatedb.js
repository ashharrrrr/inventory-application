import { Client } from "pg";
import "dotenv/config";

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category_name VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS companies (
company_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
company_name VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS items (item_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, item_name VARCHAR(255),
unit_price NUMERIC(5, 2), category_id INT REFERENCES categories(category_id) ON DELETE CASCADE, company_id INT REFERENCES companies(company_id) ON DELETE CASCADE
);


INSERT INTO categories (category_name) VALUES
('Dairy'),
('Bakery'),
('Eggs'),
('Grains'),
('Oils'),
('Beverages'),
('Fruits'),
('Water'),
('Meat & Poultry'),
('Vegetables'),
('Snacks'),
('Canned Goods'),
('Frozen Foods'),
('Condiments'),
('Pasta'),
('Seafood'),
('Herbs & Spices'),
('Nuts & Seeds'),
('Confectionery'),
('Breakfast Cereals'),
('Ready Meals'),
('Plant-based'),
('Baby Food'),
('Alcoholic Beverages'),
('Energy Drinks'),
('Chips & Crisps'),
('Ice Cream'),
('Health Supplements'),
('Pet Food'),
('Cleaning Supplies');

INSERT INTO companies (company_name) VALUES
('Amul'),
('Britannia'),
('Keggs'' Eggs'),
('India Gate'),
('Fortune'),
('Go Cheese'),
('Nescafé'),
('Fresh Farms'),
('Bisleri'),
('Venky''s'),
('Lay''s'),
('PepsiCo'),
('Kellogg''s'),
('Hershey''s'),
('Heinz'),
('Blue Dragon'),
('Oreo'),
('Nestlé Purina'),
('Knorr'),
('Maggi'),
('Coca-Cola'),
('Red Bull'),
('Ben & Jerry''s'),
('Colgate'),
('Sensodyne'),
('Dettol'),
('Surf Excel'),
('Whiskas'),
('Royal Canin'),
('Mother Dairy');

INSERT INTO items (item_name, category_id, company_id) VALUES
('Whole Milk 1L', 1, 1),
('Brown Bread Loaf', 2, 2),
('Organic Eggs (12)', 3, 3),
('Basmati Rice 5kg', 4, 4),
('Sunflower Oil 1L', 5, 5),
('Cheddar Cheese 200g', 1, 6),
('Instant Coffee 100g', 6, 7),
('Banana (1kg)', 7, 8),
('Mineral Water 1L', 8, 9),
('Chicken Breast 1kg', 9, 10),
('Potato Chips 150g', 11, 11),
('Pepsi 500ml', 6, 12),
('Corn Flakes 250g', 20, 13),
('Chocolate Bar 50g', 19, 14),
('Tomato Ketchup 500g', 14, 15),
('Soy Sauce 300ml', 14, 16),
('Chocolate Cream Biscuits', 11, 17),
('Cat Food Tuna 400g', 29, 18),
('Instant Noodles 70g', 21, 20),
('Chicken Soup Packet', 21, 19),
('Cola 1.25L', 6, 21),
('Energy Drink Can 250ml', 25, 22),
('Vanilla Ice Cream 500ml', 27, 23),
('Toothpaste Fresh Mint', 30, 24),
('Sensitive Teeth Toothpaste', 30, 25),
('Disinfectant Liquid 1L', 30, 26),
('Laundry Detergent 2kg', 30, 27),
('Dry Cat Food 1kg', 29, 28),
('Dry Dog Food 1kg', 29, 29),
('Paneer 500g', 1, 30),
('Butter 500g', 1, 1),
('Multigrain Bread Loaf', 2, 2),
('Free-range Eggs (6)', 3, 3),
('Brown Basmati Rice 1kg', 4, 4),
('Olive Oil 500ml', 5, 5),
('Mozzarella Cheese 200g', 1, 6),
('Green Tea 100g', 6, 7),
('Apple (1kg)', 7, 8),
('Sparkling Water 500ml', 8, 9),
('Chicken Wings 1kg', 9, 10),
('Salted Peanuts 250g', 18, 11),
('Canned Sweet Corn 400g', 12, 15),
('Frozen Peas 500g', 13, 19),
('Spaghetti Pasta 500g', 15, 16),
('Dark Chocolate Bar 100g', 19, 14);

`;

async function main(){
    const client = new Client({
        connectionString: process.env.POSTGRES_URI,
    })
    console.log("seeding");
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
};

main();
