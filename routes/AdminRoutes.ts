import express, { Request, Response, NextFunction } from "express";
import { CreateVendor, GetVendors, GetVendorsByID } from "../controllers";

const router = express.Router();

router.post("/vendor", CreateVendor);
router.get("/vendors", GetVendors);
router.get("/vendor/:id", GetVendorsByID);

export { router as AdminRoutes };
