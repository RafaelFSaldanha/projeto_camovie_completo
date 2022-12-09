use catalogoFilmesDB;

-- carga inicial do usuário admin
insert into tb_usuario (nm_usuario, ds_email, ds_senha)
values ('Admin', 'admin@admin.com.br', '1234');

-- CSU01:: efetuar login
select  id_usuario		id,
		nm_usuario 		nome,
        ds_email		email
from tb_usuario
where ds_email			= 'admin@admin.com.br'
and ds_senha			= '1234';

-- CSU02:: cadastrar novo filmes
insert into tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
values (1, 'Harry Potter e a Camara Secreta', 'Filme bem tops', 8.2, '2012-02-11', true);

-- CSU02.1:: alterar a imagem 
update tb_filme
set img_filme		= '/storage/filme/asdfasdf.jpg'
where id_filme = 1;

-- CSU03:: alterar filme 
update tb_filme
set nm_filme		= 'Harry Potter e a Pedra Filosofal',
	ds_sinopse 		= 'Filme bem tops', 
    vl_avaliacao	= 9.5,
    dt_lancamento	= '2010-05-03',
    bt_disponivel	= true  
where id_filme = 1;

-- CSU04:: remover filme
delete from tb_filme
where id_filme = 1;

-- CSU05:: consultar todos os filmes
select id_filme			id,
	   nm_filme			nome,
       vl_avaliacao		avaliacao,
       dt_lancamento	lancamento,
       bt_disponivel	disponivel
from tb_filme;

-- CSU06:: consultar filmes por nome
select id_filme			id,
	   nm_filme			nome,
       vl_avaliacao		avaliacao,
       dt_lancamento	lancamento,
       bt_disponivel	disponivel
from tb_filme
where nm_filme like '%a%';

-- CSU07:: consultar filme por id
select id_filme			id,
	   nm_filme			nome,
       vl_avaliacao		avaliacao,
       ds_sinopse		sinopse,
       dt_lancamento	lancamento,
       bt_disponivel	disponivel,
       img_filme		capa
from tb_filme
where id_filme = 1;