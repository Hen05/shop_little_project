const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Gerenciamento de itens
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
 * /api/item:
 *   post:
 *     summary: Cria um novo item
 *     tags: [Items]
 *     security:
 *       - cookieAuth: []  # Adiciona segurança via cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', itemController.create);

/**
 * @swagger
 * /api/item/types:
 *   get:
 *     summary: Pega os tipos dos items
 *     tags: [Items]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Pegou todos os tipos dos items
 *       404:
 *         description: Não existem items no sistema
 */
router.get('/types', itemController.getItemTypes);

/**
 * @swagger
 * /api/item:
 *   get:
 *     summary: Retorna todos os itens
 *     tags: [Items]
 *     security:
 *       - cookieAuth: []  # Adiciona segurança via cookie
 *     responses:
 *       200:
 *         description: Lista de itens
 *       500:
 *         description: Erro no servidor
 */
router.get('/', itemController.getAll);

/**
 * @swagger
 * /api/item/{itemId}:
 *   get:
 *     summary: Retorna um item pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     security:
 *       - cookieAuth: []  # Adiciona segurança via cookie
 *     responses:
 *       200:
 *         description: Item encontrado
 *       404:
 *         description: Item não encontrado
 */
router.get('/:itemId', itemController.get);

/**
 * @swagger
 * /api/item/{itemId}:
 *   put:
 *     summary: Atualiza um item pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     security:
 *       - cookieAuth: []  # Adiciona segurança via cookie
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Item não encontrado
 */
router.put('/:itemId', itemController.update);

/**
 * @swagger
 * /api/item/{itemId}:
 *   delete:
 *     summary: Deleta um item pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     security:
 *       - cookieAuth: []  # Adiciona segurança via cookie
 *     responses:
 *       200:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.delete('/:itemId', itemController.delete);

module.exports = router;
