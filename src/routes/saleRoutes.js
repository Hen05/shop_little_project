const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController.js');

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Gerenciamento de vendas
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access_token
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Retorna todas as informações de vendas
 *     tags: [Sales]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de informações de vendas
 *       500:
 *         description: Erro no servidor
 */
router.get('/', saleController.getAllSaleInfos);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Cria uma nova venda
 *     tags: [Sales]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemsData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               paymentMethod:
 *                 type: string
 *                 description: Método de pagamento utilizado na venda
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro no servidor
 */
router.post('/', saleController.create);

module.exports = router;
