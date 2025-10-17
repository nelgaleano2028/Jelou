import { Router } from "express";
import { getOrderCanceled } from "../controllers/orderCanceled.controllers.js";

const router = Router()

router.get('/orderCanceled', getOrderCanceled)

export default router