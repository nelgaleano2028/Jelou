import { Router } from "express";
import { getCustomers, getCustomer, createCustomers, updateCustomers, deleteCustomers } from "../controllers/customers.controller.js";

const router = Router()

router.get('/customers', getCustomers)
router.get('/customers/:id', getCustomer)
router.post('/customers', createCustomers)
router.patch('/customers/:id', updateCustomers)
router.delete('/customers/:id', deleteCustomers)

export default router