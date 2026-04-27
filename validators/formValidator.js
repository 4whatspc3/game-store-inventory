import { body } from "express-validator";

const formValidator = [
    body("price")
        .trim()
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 0.01 }).withMessage("Price must be a positive number"),
];

export default formValidator;