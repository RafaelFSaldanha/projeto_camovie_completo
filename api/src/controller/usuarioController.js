import { Router } from 'express';
import { login, cadastro } from '../repository/usuarioRepository.js'

const server = Router();

server.post('/usuario/cadastro', async (req, resp) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome) throw new Error('O nome é Obrigatório!')
        if (!email) throw new Error('O email é Obrigatório!')
        if (!senha) throw new Error('A senha é Obrigatória!')
        const resposta = await cadastro(nome, email, senha);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.post ('/usuario/login', async (req, resp) => {
    try {
        const {email, senha} = req.body;
        const resposta = await login (email, senha);
        if (!resposta) {
            throw new Error ('Credenciais inválidas')
        }
        resp.send(resposta)
    }
    catch (err) {
        resp.status(401).send({
            erro: err.message
        });
    }
})

export default server;