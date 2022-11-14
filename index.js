import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerjsdoc from 'swagger-jsdoc';

import { usuarios } from './rutas/usuarios.js';
import { prestamos } from './rutas/prestamos.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API prestamos',
        status: 'OK'
    })
});

const swaggerSpec = {
    definition: {
        components: {},
        openapi: '3.0.0',
        info: {
            title: 'Documentacion de API para prestamos',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000/',
            },
        ],
    },
    apis: ['./rutas/*.js']
};

app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerjsdoc(swaggerSpec))
);

app.use(usuarios);
app.use(prestamos);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
