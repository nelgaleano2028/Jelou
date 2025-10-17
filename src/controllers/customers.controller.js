import { request } from 'express'
import { pool } from '../db.js'

//TODOS LOS CLIENTES
export const getCustomers = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM customers')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//CONSULTA UN SOLO CLIENTE
export const getCustomer = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: "Customer not found"
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//CREAR CLIENTE
export const createCustomers = async (req, res) => {

    const { customer_id, name, email, phone, created } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO customers (customer_id, name, email, phone, created) VALUES (?,?,?,?,?)', [customer_id, name, email, phone, created])

        res.send({
            customer_id,
            name,
            email,
            phone,
            created
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//ACTUALIZAR CLIENTE
export const updateCustomers = async (req, res) => {

    const { id } = req.params
    const { name, email, phone, created } = req.body

    try {
        const [result] = await pool.query('UPDATE customers SET name = IFNULL(?, name), email = IFNULL(?,email), phone = IFNULL(?, phone), created = IFNULL(?, created) WHERE customer_id = ?', [name, email, phone, created, id])

        if (result.affectedRows == 0) return res.status(404).json({
            message: "Customer not found"
        })

        const [rows] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//ELIMINAR CLIENTE
export const deleteCustomers = async (req, res) => {

    try {
        const [result] = await pool.query('DELETE FROM customers WHERE customer_id = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Customer not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}