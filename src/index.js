// para poder usar ESM debemos tener una versión de NODE superior a la 16
import express from 'express';
import routesEmployees from './routes/employees.routes.js';
import routesIndex from './routes/index.routes.js';
import './config.js'

const app = express();
// middlewares before
app.use(express.json());

// variables 
app.set('port', process.env.PORT || 3000);
// rutas
app.use('/api', routesEmployees);
app.use(routesIndex);

// middleware after
app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint no encontrado"
    })
})


app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
})