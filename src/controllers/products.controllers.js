import { request } from 'express'
import { pool } from '../db.js'

//TODOS LOS PRODUCTO
export const getproducts = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM products')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//CONSULTA UN SOLO PRODUCTO
export const getproduct = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id_product = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: "Product not found"
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//CREAR PRODUCTO
export const createproducts = async (req, res) => {

    const { id_product, name, price_cents, stock, created } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO products (id_product, name, price_cents, stock, created) VALUES (?,?,?,?,?)', [id_product, name, price_cents, stock, created])

        res.send({
            id_product,
            name,
            price_cents,
            stock,
            created
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//ACTUALIZAR PRODUCTO
export const updateproducts = async (req, res) => {

    const { id } = req.params
    const { name, price_cents, stock, created } = req.body

    try {
        const [result] = await pool.query('UPDATE products SET name = IFNULL(?, name), price_cents = IFNULL(?,price_cents), stock = IFNULL(?, stock), created = IFNULL(?, created) WHERE id_product = ?', [name, price_cents, stock, created, id])

        if (result.affectedRows == 0) return res.status(404).json({
            message: "Product not found"
        })

        const [rows] = await pool.query('SELECT * FROM products WHERE id_product = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//ELIMINAR PRODUCTO
export const deleteproducts = async (req, res) => {

    try {
        const [result] = await pool.query('DELETE FROM products WHERE id_product = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Product not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}