import { Router } from "express";
import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus,
  deleteRegistration,
  getStatistics,
} from "../controllers/registrationController";
import { validateRegistration } from "../middleware/validation";

const router = Router();

// Ro'yxatdan o'tish yaratish (frontend uchun asosiy endpoint)
router.post("/register", validateRegistration, createRegistration);

// Barcha ro'yxatdan o'tishlarni olish (admin panel uchun)
router.get("/registrations", getAllRegistrations);

// Statistika
router.get("/registrations/statistics", getStatistics);

// Bitta ro'yxatdan o'tishni olish
router.get("/registrations/:id", getRegistrationById);

// Status yangilash
router.patch("/registrations/:id/status", updateRegistrationStatus);

// O'chirish
router.delete("/registrations/:id", deleteRegistration);

export default router;
