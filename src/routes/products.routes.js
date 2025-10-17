import { Router } from "express";
import { getproducts, getproduct, createproducts, updateproducts, deleteproducts } from "../controllers/products.controllers.js";

const router = Router()

router.get('/products', getproducts)
router.get('/products/:id', getproduct)
router.post('/products', createproducts)
router.patch('/products/:id', updateproducts)
router.delete('/products/:id', deleteproducts)

export default router