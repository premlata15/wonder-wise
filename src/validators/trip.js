import { body } from "express-validator";

export const createTripValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("startDate")
    .trim()
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .trim()
    .notEmpty()
    .withMessage("End date is required")
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (value < req.body.startDate) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("destinations")
    .trim()
    .notEmpty()
    .withMessage("At least one destination is required")
    .isArray()
    .withMessage("Destinations must be an array")
    .custom((value) => {
      return value.every((destination) => typeof destination === "string");
    })
    .withMessage("Each destination must be a string"),

  body("budget.total")
    .trim()
    .notEmpty()
    .withMessage("Budget total is required")
    .isNumeric()
    .withMessage("Budget total must be a number"),
  body("budget.expenses")
    .optional()
    .isArray()
    .withMessage("Expenses must be an array"),
  body("budget.expenses.*.name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Expense name is required"),
  body("budget.expenses.*.amount")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("Expense amount must be a number"),
];
export const updateTripValidator = [
  body("title")
    .optional()
    .trim()
    .isString()
    .withMessage("Title must be a string"),
  body("startDate")
    .optional()
    .trim()
    .isDate()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .optional()
    .trim()
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (req.body.startDate && value < req.body.startDate) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("destinations")
    .optional()
    .trim()
    .isArray()
    .withMessage("Destinations must be an array")
    .custom((value) => {
      return value.every((destination) => typeof destination === "string");
    })
    .withMessage("Each destination must be a string"),
  body("budget.total")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("Budget total must be a number"),
  body("budget.expenses")
    .optional()
    .isArray()
    .withMessage("Expenses must be an array"),
  body("budget.expenses.*.name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Expense name is required"),
  body("budget.expenses.*.amount")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("Expense amount must be a number"),
];
