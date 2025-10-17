import { json, request } from 'express'
import { pool } from '../db.js'

//CREAR PEDIDO
export const getOrderConfirmed = async (req, res) => {

    const { id_orders } = req.body

    if (req.body.id_orders == null) return res.status(404).json({
        message: "Incomplete data provided"
    })

    try {
        const [resultOrder] = await pool.query('SELECT * FROM orders WHERE id_orders = ?', [id_orders])

        if (resultOrder.length <= 0) return res.status(404).json({
            message: "Order not found"
        })

        if (resultOrder[0].status_order != 'CREATED') return res.status(404).json({
            message: 'The order status is different from CREATED'
        })

        const estado = 'CONFIRMED'

        const [resultEstado] = await pool.query('UPDATE orders SET status_order = ? WHERE id_orders = ?', [estado, id_orders])

        const [resultEstadoOrder] = await pool.query('SELECT *  FROM orders WHERE id_orders = ?', [id_orders])
        const [resultConsumer] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [resultEstadoOrder[0].customer_id])
        const [resultOrderItem] = await pool.query('SELECT * FROM order_items WHERE id_orders = ?', [id_orders])
        const [resultProduct] = await pool.query('SELECT * FROM products WHERE id_product = ?', [resultOrderItem[0].id_product])

        res.send({
            resultEstadoOrder,
            resultConsumer,
            resultProduct
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}