import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import usuarioController from './controller/usuarioController.js'
import filmeController from './controller/filmeController.js'

const server = express();
server.use(cors());
server.use(express.json());

server.use('/storage/capasFilmes', express.static('storage/capasFilmes'));

server.use(usuarioController);
server.use (filmeController);

server.listen(process.env.PORT, () => console.log(`API conectada na porta ${process.env.PORT}`))