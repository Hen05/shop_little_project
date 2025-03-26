const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticationController');
const {verifyToken} = require("../middlewares/authenticationMiddleware");

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Gerenciamento de Autenticação
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     security: []
 *     description: Cria um novo usuário com um nome de usuário e senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso
 *       409:
 *         description: Usuário já existe
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Faz login do usuário
 *     tags: [Autenticação]
 *     security: []
 *     description: Autentica um usuário com nome de usuário e senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       404:
 *         description: Usuário não encontrado
 *       422:
 *         description: Senha inválida
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Autenticação]
 *     summary: Faz logout do usuário
 *     security:
 *       - cookieAuth: []
 *     description: Finaliza a sessão do usuário e revoga o token de acesso
 *     responses:
 *       200:
 *         description: Logout bem-sucedido
 */
router.post('/logout', verifyToken, authController.logout);

/**
 * @swagger
 * /api/auth/getUserInfos:
 *   get:
 *     tags:
 *       - Autenticação
 *     summary: Obtém informações do usuário
 *     security:
 *       - cookieAuth: []
 *     description: Retorna as informações do usuário autenticado
 *     responses:
 *       200:
 *         description: Informações do usuário retornadas com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/getUserInfos', verifyToken, authController.getUserInfos);

/**
 * @swagger
 * /api/auth/isAuthenticated:
 *   get:
 *     tags:
 *       - Autenticação
 *     summary: Verifica se o usuário está autenticado
 *     security:
 *       - cookieAuth: []
 *     description: Retorna uma resposta se o usuário está autenticado!
 *     responses:
 *       200:
 *         description: Usuário está autenticado
 *       403:
 *         description: Usuário não autenticado
 */
router.get('/isAuthenticated', verifyToken, authController.isAuthenticated);

module.exports = router;
