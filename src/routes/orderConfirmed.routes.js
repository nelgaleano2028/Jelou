import { Router } from "express";
import { getOrderConfirmed } from "../controllers/orderConfirmed.controller.js";

const router = Router()

router.get('/orderConfirmed', getOrderConfirmed)

export default router