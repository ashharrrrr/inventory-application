import { body, validationResult } from "express-validator";
import {
  getAllItemsDB,
  getAllCategoriesDB,
  getItemsByCategoryDB,
  getAllCompaniesDB,
  getItemsByCompanyDB,
  addNewCategoryDB,
  addNewCompanyDB,
  addItemDB,
  getItemByIdDB,
  updateItemDB,
  getCategoryByIdDB,
  getCompanyByIdDB,
  getCategoryByIdFullDB,
  updateCategoryDB,
  getCompanyByIdFullDB,
  updateCompanyDB,
  deleteItemDB,
  deleteCategoryDB,
  deleteCompanyDB,
} from "../db/queries.js";

const validateItem = [
  body("itemName")
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage(`Make item Name AlphaNumeric (spaces allowed)`)
    .isLength({ min: 1, max: 50 })
    .withMessage(`Item Name too Long`),
  body("itemPrice")
    .isFloat({ min: 0, max: 9999 })
    .withMessage(`Unit Price must be a number between 0 and 9999 (decimals allowed)`),
  body("company")
    .notEmpty()
    .withMessage("Please select a company."),
  body("category")
    .notEmpty()
    .withMessage("Please select a category."),
];

export async function getAllItems(req, res) {
  try {
    const items = await getAllItemsDB();
    res.render("index", { items: items });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to fetch items." }] });
  }
}

export async function getAllCategories(req, res) {
  try {
    const categories = await getAllCategoriesDB();
    res.render("categories", { categories: categories });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to fetch categories." }] });
  }
}

export async function getItemsByCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const items = await getItemsByCategoryDB(categoryId);
    const categoryName = await getCategoryByIdDB(categoryId);
    res.render("sortedBy", {
      items: items,
      sortedByName: categoryName,
      sortedType: "Category",
      sortedId: categoryId,
    });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to fetch items for category." }] });
  }
}

export async function getAllCompanies(req, res) {
  try {
    const companies = await getAllCompaniesDB();
    res.render("companies", { companies: companies });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to fetch companies." }] });
  }
}

export async function getItemsByCompany(req, res) {
  try {
    const companyId = req.params.companyId;
    const items = await getItemsByCompanyDB(companyId);
    const companyName = await getCompanyByIdDB(companyId);
    res.render("sortedBy", {
      items: items,
      sortedByName: companyName,
      sortedType: "Company",
      sortedId: companyId,
    });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to fetch items for company." }] });
  }
}

export async function addNewCategory(req, res) {
  try {
    const category = req.body.categoryName;
    await addNewCategoryDB(category);
    res.redirect("/categories");
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to add category." }] });
  }
}

export async function addNewCompany(req, res) {
  try {
    const company = req.body.companyName;
    await addNewCompanyDB(company);
    res.redirect("/companies");
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to add company." }] });
  }
}

export async function getAddItemForm(req, res) {
  try {
    const categories = await getAllCategoriesDB();
    const companies = await getAllCompaniesDB();
    res.render("addItem", { categories: categories, companies: companies });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to load add item form." }] });
  }
}

export const postAddItemForm = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const { itemName, itemPrice, category, company } = req.body;
    const categories = await getAllCategoriesDB();
    const companies = await getAllCompaniesDB();
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("addItem", {
          item: { item_name: itemName, unit_price: itemPrice },
          company: company,
          category: category,
          errors: errors.array(),
          companies: companies,
          categories: categories
        });
    }
    await addItemDB(itemName, itemPrice, category, company);
    res.redirect("/");
  }
];

export async function getUpdateItemForm(req, res) {
  try {
    const itemId = req.params.id;
    const item = await getItemByIdDB(itemId);
    const categories = await getAllCategoriesDB();
    const companies = await getAllCompaniesDB();
    res.render("updateItem", {
      item: item,
      categories: categories,
      companies: companies,
    });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to load update item form." }] });
  }
}

export const postUpdateItemForm = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const { itemName, itemPrice, category, company } = req.body;
    const categories = await getAllCategoriesDB();
    const companies = await getAllCompaniesDB();
    const itemId = req.params.id;
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("updateItem", {
          item: {item_id: itemId, item_name: itemName, unit_price: itemPrice },
          company: company,
          category: category,
          errors: errors.array(),
          companies: companies,
          categories: categories
        });
    }

    await updateItemDB(itemId, itemName, itemPrice, category, company);
    res.redirect("/");
  }
];

export async function getUpdateCategoryForm(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryByIdFullDB(categoryId);
    res.render("updateCategory", { category });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to load update category form." }] });
  }
}


export async function getUpdateCompanyForm(req, res) {
  try {
    const companyId = req.params.id;
    const company = await getCompanyByIdFullDB(companyId);
    res.render("updateCompany", { company });
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to load update company form." }] });
  }
}


export async function deleteItem(req, res) {
  try {
    const itemId = req.params.id;
    await deleteItemDB(itemId);
    res.redirect(req.get("Referer"));
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to delete item." }] });
  }
}

export async function deleteCategory(req, res) {
  try {
    const categoryId = req.params.id;
    await deleteCategoryDB(categoryId);
    res.redirect("/categories");
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to delete category." }] });
  }
}

export async function deleteCompany(req, res) {
  try {
    const companyId = req.params.id;
    await deleteCompanyDB(companyId);
    res.redirect("/companies");
  } catch (err) {
    res.status(500).render("errors", { errors: [{ msg: "Failed to delete company." }] });
  }
}


// --- VALIDATION ARRAYS AND VALIDATION-BASED EXPORTS ---

const validateCategory = [
  body("categoryName")
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage("Category name must be alphanumeric (spaces allowed)")
    .isLength({ min: 1, max: 50 })
    .withMessage("Category name must be between 1 and 50 characters")
];

const validateCompany = [
  body("companyName")
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage("Company name must be alphanumeric (spaces allowed)")
    .isLength({ min: 1, max: 50 })
    .withMessage("Company name must be between 1 and 50 characters")
];

export const postAddCategoryForm = [
  validateCategory,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { categoryName } = req.body;
      if (!errors.isEmpty()) {
        return res.status(400).render("addCategoryForm", {
          category: { category_name: categoryName },
          errors: errors.array()
        });
      }
      await addNewCategoryDB(categoryName);
      res.redirect("/categories");
    } catch (err) {
      res.status(500).render("errors", { errors: [{ msg: "Failed to add category." }] });
    }
  }
];

export const postAddCompanyForm = [
  validateCompany,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { companyName } = req.body;
      if (!errors.isEmpty()) {
        return res.status(400).render("addCompanyForm", {
          company: { company_name: companyName },
          errors: errors.array()
        });
      }
      await addNewCompanyDB(companyName);
      res.redirect("/companies");
    } catch (err) {
      res.status(500).render("errors", { errors: [{ msg: "Failed to add company." }] });
    }
  }
];

export const postUpdateCategoryForm = [
  validateCategory,
  async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { categoryName } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateCategory", {
          category: { category_id: categoryId, category_name: categoryName },
          errors: errors.array()
        });
      }
      await updateCategoryDB(categoryId, categoryName);
      res.redirect("/categories");
    } catch (err) {
      res.status(500).render("errors", { errors: [{ msg: "Failed to update category." }] });
    }
  }
];

export const postUpdateCompanyForm = [
  validateCompany,
  async (req, res) => {
    try {
      const companyId = req.params.id;
      const { companyName } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateCompany", {
          company: { company_id: companyId, company_name: companyName },
          errors: errors.array()
        });
      }
      await updateCompanyDB(companyId, companyName);
      res.redirect("/companies");
    } catch (err) {
      res.status(500).render("errors", { errors: [{ msg: "Failed to update company." }] });
    }
  }
];