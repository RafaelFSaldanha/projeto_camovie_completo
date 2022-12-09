import { con } from './connection.js'

export async function inserirFilme (filme) {
    const comando = 
    `   insert into tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
        values (?, ?, ?, ?, ?, ?)`;
    const [resposta] = await con.query (comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    filme.id = resposta.insertId;
    return filme;
}

export async function alterarImagem (imagem, id) {
    const comando = 
    `   update tb_filme
        set img_filme		= ?
        where id_filme      = ?`;
    const [resposta] = await con.query(comando, [imagem, id]);
    return resposta.affectedRows;
}

export async function listarTodosFilmes() {
    const comando = 
    `select id_filme			id,
            nm_filme			nome,
            vl_avaliacao		avaliacao,
            dt_lancamento	lancamento,
            bt_disponivel	disponivel
        from tb_filme`;
    const [linhas] = await con.query(comando);
    return linhas;
}

export async function buscarPorId(id) {
    const comando = 
    `select id_filme			id,
            nm_filme			nome,
            ds_sinopse          sinopse,
            img_filme           imagem,
            vl_avaliacao		avaliacao,
            dt_lancamento	    lancamento,
            bt_disponivel	    disponivel,
            id_usuario          usuario
        from tb_filme
        where id_filme          = ?`;
    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}

export async function buscarPorNome(nome) {
    const comando = 
    `select id_filme			id,
            nm_filme			nome,
            vl_avaliacao		avaliacao,
            dt_lancamento	    lancamento,
            bt_disponivel	    disponivel,
            id_usuario          usuario
        from tb_filme
        where nm_filme          like ?`;
    const [linhas] = await con.query(comando, [ `%${nome}%` ]);
    return linhas;
}

export async function removerFilme (id) {
    const comando =
    `   delete from tb_filme
        where id_filme = ?`;
    const [reposta] = await con.query(comando, [id]);
    return reposta.affectedRows;
}

export async function alterarFilme (id, filme) {
    const comando = 
    `update tb_filme
        set nm_filme		= ?,
            ds_sinopse 		= ?, 
            vl_avaliacao	= ?,
            dt_lancamento	= ?,
            bt_disponivel	= ?,
            id_usuario      = ?
        where id_filme      = ?`;
    const [resposta] = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, filme.usuario, id]);
    return resposta.affectedRows;
}