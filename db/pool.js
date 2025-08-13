import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
    connectionString: process.env.POSTGRES_URI, 
});
