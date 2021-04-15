const express = require('express');
const routes = express.Router();
const UserController = require('./controller/UserController');
// GET: buscar/listar uma informação no backend
// POST: Criar uma informação no backend
// PUT: Alterar uma informação no backend
// DELETE: Deletar uma informação no backend

// Parametros
// Query: parametros nomeados enviados na rota
// Route params: parametros ultilizados para identificar um recurso
// Request Body: corpo da requisição

// Drive: Select * from users:
// Query Buiders: table('users').select('*').where('')

routes.get('/users', UserController.list)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

module.exports = routes