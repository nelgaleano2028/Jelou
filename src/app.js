import express from 'express'
import employeesRoutes from './routes/employes.routes.js'
import customersRoutes from './routes/customers.routes.js'
import productsRoutes from './routes/products.routes.js'
import orderCreateRoutes from './routes/orderCreate.routes.js'
import OrderConfirmedRoutes from './routes/orderConfirmed.routes.js'
import OrderCanceledRoutes from './routes/orderCanceled.routes.js'

import indexRoutes from './routes/index.routes.js'

const app =  express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',employeesRoutes)
app.use('/api',customersRoutes)
app.use('/api',productsRoutes)
app.use('/api',orderCreateRoutes)
app.use('/api',OrderConfirmedRoutes)
app.use('/api',OrderCanceledRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint Not Found'
    })
})

export default app;