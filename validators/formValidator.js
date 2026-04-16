import { body } from "express-validator";

const formValidator = [
    body("price")
        .trim()
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 0.01 }).withMessage("Price must be a positive number"),

    body("stock")
        .trim()
        .notEmpty().withMessage("Stock quantity is required")
        .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
];

export default formValidator;