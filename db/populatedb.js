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
('Mother Dairy'),
('Tata Consumer'),
('Parle Products');

INSERT INTO items (item_name, unit_price, category_id, company_id) VALUES
('Whole Milk 1L', 55.00, 1, 1),
('Brown Bread Loaf', 40.00, 2, 2),
('Organic Eggs (12)', 120.00, 3, 3),
('Basmati Rice 5kg', 350.00, 4, 4),
('Sunflower Oil 1L', 150.00, 5, 5),
('Cheddar Cheese 200g', 110.00, 1, 6),
('Instant Coffee 100g', 180.00, 6, 7),
('Banana (1kg)', 45.00, 7, 8),
('Mineral Water 1L', 20.00, 8, 9),
('Chicken Breast 1kg', 250.00, 9, 10),
('Potato Chips 150g', 35.00, 11, 11),
('Pepsi 500ml', 40.00, 6, 12),
('Corn Flakes 250g', 90.00, 20, 13),
('Chocolate Bar 50g', 60.00, 19, 14),
('Tomato Ketchup 500g', 85.00, 14, 15),
('Soy Sauce 300ml', 120.00, 14, 16),
('Chocolate Cream Biscuits', 30.00, 11, 17),
('Cat Food Tuna 400g', 150.00, 29, 18),
('Instant Noodles 70g', 20.00, 21, 20),
('Chicken Soup Packet', 35.00, 21, 19),
('Cola 1.25L', 60.00, 6, 21),
('Energy Drink Can 250ml', 110.00, 25, 22),
('Vanilla Ice Cream 500ml', 120.00, 27, 23),
('Toothpaste Fresh Mint', 80.00, 30, 24),
('Sensitive Teeth Toothpaste', 95.00, 30, 25),
('Disinfectant Liquid 1L', 120.00, 30, 26),
('Laundry Detergent 2kg', 220.00, 30, 27),
('Dry Cat Food 1kg', 350.00, 29, 28),
('Dry Dog Food 1kg', 400.00, 29, 29),
('Paneer 500g', 90.00, 1, 30),
('Butter 500g', 120.00, 1, 1),
('Multigrain Bread Loaf', 45.00, 2, 2),
('Free-range Eggs (6)', 70.00, 3, 3),
('Brown Basmati Rice 1kg', 80.00, 4, 4),
('Olive Oil 500ml', 180.00, 5, 5),
('Mozzarella Cheese 200g', 115.00, 1, 6),
('Green Tea 100g', 150.00, 6, 7),
('Apple (1kg)', 120.00, 7, 8),
('Sparkling Water 500ml', 35.00, 8, 9),
('Chicken Wings 1kg', 220.00, 9, 10),
('Salted Peanuts 250g', 60.00, 18, 11),
('Canned Sweet Corn 400g', 55.00, 12, 15),
('Frozen Peas 500g', 70.00, 13, 19),
('Spaghetti Pasta 500g', 90.00, 15, 16),
('Dark Chocolate Bar 100g', 80.00, 19, 14);

`;

async function main(){
    const client = new Client({
        connectionString: process.env.POSTGRES_URI,
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
};

main();
