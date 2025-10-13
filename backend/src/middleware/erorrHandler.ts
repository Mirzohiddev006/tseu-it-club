import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error("Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Ichki server xatosi";

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    res.status(400).json({
      success: false,
      message: "Ma'lumotlar validatsiyasi xatosi",
      errors: err.message,
    });
    return;
  }

  // Sequelize unique constraint error
  if (err.name === "SequelizeUniqueConstraintError") {
    res.status(409).json({
      success: false,
      message: "Bu ma'lumot allaqachon mavjud",
    });
    return;
  }

  // Database connection error
  if (err.name === "SequelizeConnectionError") {
    res.status(503).json({
      success: false,
      message: "Ma'lumotlar bazasiga ulanishda xatolik",
    });
    return;
  }

  // Default error response
  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" ? "Xatolik yuz berdi" : message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
