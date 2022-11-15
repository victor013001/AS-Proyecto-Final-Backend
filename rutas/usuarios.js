import express from 'express';
import { PrismaClient } from '@prisma/client';

const usuarios = express.Router();
const prisma = new PrismaClient();

usuarios.route('/usuario').get(getUsuario());

function getUsuario() {
    return async (req, res) => {
        try {
            const { documento, tipoDocumento } = req.query;

            const usuario = await prisma.Usuarios.findUnique({
                where: {
                    documento_tipoDocumento: {documento,tipoDocumento}
                }
            });
            
            if (usuario === null) {
                res.status(204).json({
                    status: 'No existe'
                })
            } else {
                res.status(200).json({
                    usuario,
                })
            }
        } catch (error){
            res.status(500).json({
                status: 'Error inesperado', error
            })
        }
    }
};

/** 
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Obtener los datos de un usuario.
 */
/**
 * @swagger
 * paths:
 *  /usuario:
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
 *      summary: Endpoint para obtener los datos del usuario
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Fue posible conectarse a la base de datos y obtener el usuario           
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              documento:
 *                                  type: String
 *                                  example: 9999999999
 *                              tipoDocumento:
 *                                  type: String
 *                                  example: cedula ciudadania
 *                              nombre:
 *                                  type: String
 *                                  example: Victor
 *                              cupo:
 *                                  type: Int
 *                                  example: 10000000
 *          204:
 *              description: No se encontro el usuario, no se necesita navegar de la pagina actual.
 *              
 *          500:
 *              description: Error inesperado conectando a la base de datos
 */

export {usuarios};
