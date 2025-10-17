import { json, request } from 'express'
import { pool } from '../db.js'

//CREAR PEDIDO
export const getOrderCreate = async (req, res) => {

    const { customer_id, id_product, cantidad } = req.body

    if (req.body.customer_id == null || req.body.id_product == null || req.body.cantidad == null) return res.status(404).json({
        message: "Incomplete data provided"
    })

    try {
        const [resultConsumer] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [customer_id])

        if (resultConsumer.length <= 0) return res.status(404).json({
            message: "Customer not found"
        })

        const [resultProduct] = await pool.query('SELECT * FROM products WHERE id_product = ?', [id_product])

        const precioUnidad = resultProduct[0].price_cents

        if (resultProduct.length <= 0) return res.status(404).json({
            message: "Product not found"
        })

        if (resultProduct[0].stock < cantidad) return res.status(404).json({
            message: 'The quantity exceeds the stock, there are only ' + resultProduct[0].stock + ' products in stock.'
        })

        const [resulPreStock] = await pool.query('SELECT ? * ? AS Total_cents, ? - ? AS New_Stock', [cantidad, resultProduct[0].price_cents, resultProduct[0].stock, cantidad])

        const precioTotal = resulPreStock[0].Total_cents
        const newStock = resulPreStock[0].New_Stock
        const estado = 'CREATED'

        const [resultNewStock] = await pool.query('UPDATE products SET stock = ? WHERE id_product = ?', [newStock, id_product])

        const [resultOrder] = await pool.query('INSERT INTO orders (customer_id, status_order, total_cents) VALUES (?,?,?)', [customer_id, estado, precioTotal])

        const [resultOrderNew] = await pool.query('SELECT MAX(id_orders) as id_orders  FROM orders')
        const newOrder = resultOrderNew[0].id_orders

        const [resultOrderItem] = await pool.query('INSERT INTO order_items (id_orders, id_product, cantidad, unit_price_cents, subtotal_cents) VALUES (?,?,?,?,?)', [newOrder, id_product, cantidad, precioUnidad, precioTotal])

        res.send({
            id: resultOrder.insertId,
            customer_id,
            resultConsumer,
            estado,
            precioTotal,
            id: resultOrderItem.insertId,
            newOrder,
            resultProduct,
            id_product,
            cantidad,
            precioUnidad,
            precioTotal
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}