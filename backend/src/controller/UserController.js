const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async list(req, res) {
        const users = await connection('users').select('*');
        return res.json(users);
    },
    async show(req, res) {
        const { id } = req.params
        const user = await connection('users').where('id', id).select('*');
        return res.json(user);
    },
    async create(req, res) {
        const { name, email, idade, empresa } = req.body
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('users').insert({
            id,
            name,
            email,
            idade,
            empresa
        })
        return res.json({ id })
    },
    async update(req, res) {
        const { id } = req.params
        const { name, email, idade, empresa } = req.body
        await connection('users').where('id', id).update({
            id,
            name,
            email,
            idade,
            empresa
        })
        return res.status(204).send();
    },
    async delete(req, res) {
        const { id } = req.params
        await connection('users').where('id', id).delete();
        return res.json(204).send();
    },
}