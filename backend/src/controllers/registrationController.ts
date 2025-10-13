import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Registration from "../models/Registration";
import { logger } from "../utils/logger";
import { sequelize } from "../config/database";

export const createRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const { clubId, club, name, faculty, course, phone, notes } = req.body;

    // Tekshirish: bir xil odam bir xil klubga ikki marta ro'yxatdan o'tmasin
    const existingRegistration = await Registration.findOne({
      where: { clubId, phone },
    });

    if (existingRegistration) {
      res.status(409).json({
        success: false,
        message: "Siz allaqachon ushbu klubga ro'yxatdan o'tgansiz",
      });
      return;
    }

    const registration = await Registration.create({
      clubId,
      club,
      name,
      faculty: faculty || "",
      course: course || "",
      phone,
      notes: notes || "",
      status: "pending",
    });

    logger.info(
      `New registration created: ${registration.id} - ${name} for ${club}`
    );

    res.status(201).json({
      success: true,
      message: "Ro'yxatdan o'tish muvaffaqiyatli amalga oshirildi",
      data: {
        id: registration.id,
        club: registration.club,
        status: registration.status,
      },
    });
  } catch (error) {
    logger.error("Registration creation error:", error);
    next(error);
  }
};

export const getAllRegistrations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { clubId, status, page = 1, limit = 50 } = req.query;

    const where: any = {};
    if (clubId) where.clubId = clubId;
    if (status) where.status = status;

    const offset = (Number(page) - 1) * Number(limit);

    const { rows, count } = await Registration.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (error) {
    logger.error("Get registrations error:", error);
    next(error);
  }
};

export const getRegistrationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      res.status(404).json({
        success: false,
        message: "Ro'yxatdan o'tish topilmadi",
      });
      return;
    }

    res.json({
      success: true,
      data: registration,
    });
  } catch (error) {
    logger.error("Get registration by ID error:", error);
    next(error);
  }
};

export const updateRegistrationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      res.status(400).json({
        success: false,
        message: "Noto'g'ri status",
      });
      return;
    }

    const registration = await Registration.findByPk(id);

    if (!registration) {
      res.status(404).json({
        success: false,
        message: "Ro'yxatdan o'tish topilmadi",
      });
      return;
    }

    registration.status = status;
    await registration.save();

    logger.info(`Registration ${id} status updated to ${status}`);

    res.json({
      success: true,
      message: "Status yangilandi",
      data: registration,
    });
  } catch (error) {
    logger.error("Update registration status error:", error);
    next(error);
  }
};

export const deleteRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      res.status(404).json({
        success: false,
        message: "Ro'yxatdan o'tish topilmadi",
      });
      return;
    }

    await registration.destroy();

    logger.info(`Registration ${id} deleted`);

    res.json({
      success: true,
      message: "Ro'yxatdan o'tish o'chirildi",
    });
  } catch (error) {
    logger.error("Delete registration error:", error);
    next(error);
  }
};

export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const totalRegistrations = await Registration.count();
    const pendingCount = await Registration.count({
      where: { status: "pending" },
    });
    const approvedCount = await Registration.count({
      where: { status: "approved" },
    });
    const rejectedCount = await Registration.count({
      where: { status: "rejected" },
    });

    const clubStats = await Registration.findAll({
      attributes: [
        "club",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      group: ["club"],
      order: [[sequelize.fn("COUNT", sequelize.col("id")), "DESC"]],
    });

    res.json({
      success: true,
      data: {
        total: totalRegistrations,
        byStatus: {
          pending: pendingCount,
          approved: approvedCount,
          rejected: rejectedCount,
        },
        byClub: clubStats,
      },
    });
  } catch (error) {
    logger.error("Get statistics error:", error);
    next(error);
  }
};
