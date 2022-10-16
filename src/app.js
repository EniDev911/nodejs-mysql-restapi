// para poder usar ESM debemos tener una versión de NODE superior a la 16
import express from 'express';
import routesEmployees from './routes/employees.routes.js';
import routesIndex from './routes/index.routes.js';

const app = express();
// middlewares before
app.use(express.json());

// rutas
app.use('/api', routesEmployees);
app.use(routesIndex);

// middleware after
app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint no encontrado"
    })
})

export default app;