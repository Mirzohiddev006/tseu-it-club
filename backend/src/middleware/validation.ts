import { body } from "express-validator";

export const validateRegistration = [
  body("clubId").isInt({ min: 1 }).withMessage("Club ID raqam bo'lishi kerak"),

  body("club")
    .trim()
    .notEmpty()
    .withMessage("Klub nomi bo'sh bo'lmasligi kerak")
    .isLength({ max: 100 })
    .withMessage("Klub nomi 100 belgidan oshmasligi kerak"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Ism familiya bo'sh bo'lmasligi kerak")
    .isLength({ min: 3, max: 100 })
    .withMessage("Ism familiya 3-100 belgi oralig'ida bo'lishi kerak"),

  body("faculty")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Fakultet nomi 100 belgidan oshmasligi kerak"),

  body("course")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Kurs 50 belgidan oshmasligi kerak"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Telefon raqami bo'sh bo'lmasligi kerak")
    .matches(/^\+?998[0-9]{9}$/)
    .withMessage("Telefon raqami noto'g'ri formatda (+998901234567)"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Qiziqishlar 500 belgidan oshmasligi kerak"),
];
