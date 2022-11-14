import express from 'express';
import { PrismaClient } from '@prisma/client';

const prestamos = express.Router();
const prisma = new PrismaClient();

prestamos.route('/usuario/prestamo').post(postPrestamo());
prestamos.route('/usuario/prestamos').get(getPrestamos());

function postPrestamo() {
    return async (req, res) => {
        const { documento, tipoDocumento, cupo, tipoPrestamo,
            descripcion, valorPrestamo, numeroCuotas, diaCorte } = req.body;

        //Validacion en back del valor
        if (valorPrestamo > cupo) {
            res.status(204).json({
                status: 'Excede el cupo'
            })
        } else {
            try {
                const tasaInteres = 1.0 + (numeroCuotas / 100);
                const nuevoCupo = cupo - valorPrestamo;

                const prestamo = await prisma.prestamos.create({
                    data: {
                        documento: documento,
                        tipoDocumento: tipoDocumento,
                        tipoPrestamo: tipoPrestamo,
                        descripcion: descripcion,
                        valorPrestamo: valorPrestamo,
                        numeroCuotas: numeroCuotas,
                        diaCorte: diaCorte,
                        tasaInteres: tasaInteres
                    }
                })

                let usuario = await prisma.usuarios.update({
                    where: {
                        documento_tipoDocumento: { documento, tipoDocumento }
                    },
                    data: {
                        cupo: nuevoCupo,
                    }
                })

                res.status(200).json({
                    prestamo, nuevoCupo
                })

            } catch {
                res.status(500).json({
                    status: 'Error inesperado',
                })
            }
        }
    }
};

function getPrestamos() {
    return async (req, res) => {
        try {
            const { documento, tipoDocumento } = req.query;

            const prestamosUsuario = await prisma.Prestamos.findMany({
                where: {
                    documento:documento,
                    tipoDocumento: tipoDocumento
                }
            });
            
            if (prestamosUsuario === null) {
                res.status(204).json({
                    status: 'No existen prestamos'
                })
            } else {
                res.status(200).json({
                    prestamosUsuario,
                })
            }
        } catch {
            res.status(500).json({
                status: 'Error inesperado',
            })
        }
    }
};

/** 
 * @swagger
 * tags:
 *  name: Prestamos
 *  description: Realizar un prestamo o consultar el historial.
 */
/**
 * @swagger
 * paths:
 *  /usuario/prestamo:
 *   post:
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             documento:
 *              type: String
 *              example: 123456789
 *             tipoDocumento:
 *              type: String
 *              example: cedula ciudadania
 *             cupo:
 *              type: Float
 *              example: 1000000
 *             tipoPrestamo:
 *              type: string
 *              example: Prestamo educativo
 *             descripcion:
 *              type: string
 *              example: Prestamos para educacion
 *             valorCredito:
 *              type: string
 *              example: 5000000
 *             numeroCuotas:
 *              type: int
 *              example: 30
 *             diaCorte:
 *              type: int
 *              example: 20
 *      summary: Endpoint para realizar un prestamo
 *      tags: [Prestamos]
 *      responses:
 *          200:
 *              description: Fue posible conectarse a la base de datos realizar el prestamo y actualizar el cupo          
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              tipoPrestamo:
 *                                  type: string
 *                                  example: Prestamo educativo
 *                              descripcion:
 *                                  type: string
 *                                  example: Prestamos para educacion
 *                              valorCredito:
 *                                  type: string
 *                                  example: 5000000
 *                              numeroCuotas:
 *                                  type: int
 *                                  example: 30
 *                              diaCorte:
 *                                  type: int
 *                                  example: 20
 *                              tasaInteres:
 *                                  type: float
 *                                  example: 1.3
 *                              estado:
 *                                  type: string
 *                                  example: activo
 *                              documento:
 *                                  type: String
 *                                  example: 9999999999
 *                              tipoDocumento:
 *                                  type: String
 *                                  example: cedula ciudadania
 *                              cupo:
 *                                  type: Int
 *                                  example: 5000000
 *                              
 *          204:
 *              description: El valor excede el cupo, no se necesita navegar de la pagina actual.
 *              
 *          500:
 *              description: Error inesperado conectando a la base de datos
 * 
 *  
 *  /usuario/prestamos:
 *   get:
 *      parameters:
 *          - in: query
 *            name: documento
 *            schema:
 *             type: String
 *             example : 123456789
 *            description: El documento del usuario
 *          - in: query
 *            name: tipoDocumento
 *            schema:
 *             type: String
 *             example: cedula ciudadania
 *            description: El tipo del documento del usuario 
 *      summary: Endpoint para obtener los prestamos de un usuario
 *      tags: [Prestamos]
 *      responses:
 *          200:
 *              description: Fue posible conectarse a la base de datos y obtener los prestamos          
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              tipoPrestamo:
 *                                  type: string
 *                                  example: Prestamo educativo
 *                              descripcion:
 *                                  type: string
 *                                  example: Prestamos para educacion
 *                              valorCredito:
 *                                  type: string
 *                                  example: 5000000
 *                              numeroCuotas:
 *                                  type: int
 *                                  example: 30
 *                              diaCorte:
 *                                  type: int
 *                                  example: 20
 *                              tasaInteres:
 *                                  type: float
 *                                  example: 1.3
 *                              estado:
 *                                  type: string
 *                                  example: activo
 *                              documento:
 *                                  type: String
 *                                  example: 9999999999
 *                              tipoDocumento:
 *                                  type: String
 *                                  example: cedula ciudadania
 * 
 *          204:
 *              description: No se encontraron prestamos, no se necesita navegar de la pagina actual.
 *              
 *          500:
 *              description: Error inesperado conectando a la base de datos
 */

export { prestamos };