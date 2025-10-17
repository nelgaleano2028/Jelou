import { Router } from "express";
import { getOrderCreate } from "../controllers/orderCreate.controller.js";

const router = Router()

router.get('/orderCreate', getOrderCreate)

export default router