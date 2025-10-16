import express from 'express'
import employeesRoutes from './routes/employes.routes.js';
import indexRoutes from './routes/index.routes.js'

import {PORT} from './config.js'

const app =  express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',employeesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint Not Found'
    })
})

export default app;