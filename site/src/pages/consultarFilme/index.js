import './index.scss'
import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import { listarTodosFilmes, buscarFilmesPorNome, removerFilme } from '../../api/filmeApi'
import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'; 
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Buscar from '../../assets/images/busca.png'
import Editar from '../../assets/images/editar.png'
import Remover from '../../assets/images/remover.png'

export default function Index() {
    const [filmes, setFilmes] = useState ([]);
    const [filtro, setFiltro] = useState ('');
    
    const navigate = useNavigate();

    function abrirDetalhes(id) {
        navigate(`/detalhe/${id}`);
    }

    function editarFilme(id) {
        navigate(`/alterar/${id}`);
    }

    async function removerFilmeClick(id, nome) {
        confirmAlert({
            title: 'Remover Filme',
            message: `Deseja remover o filme ${nome}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        await removerFilme(id, nome);
                        if (filtro === '')
                            carregarTodosFilmes();
                        else 
                            filtrar();
                        toast.success('Filme removido!');
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }
 
    async function filtrar() {
        const resp = await  buscarFilmesPorNome(filtro);
        setFilmes(resp);
    }

    async function carregarTodosFilmes() {
        const resp = await listarTodosFilmes();
        setFilmes(resp);
    }

    useEffect (() => {
        carregarTodosFilmes();
    }, [])

    return (
        <main className='page page-consultar'>
            <Menu selecionado='consultar' />
            <div className='container'>
                <Cabecalho />
                <div className='conteudo'>
                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome' value={filtro} onChange={e => setFiltro(e.target.value)} />
                        <img className='imgBuscar' src={Buscar} alt='buscar' onClick={filtrar} />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>IDENTIFICAÇÃO</th>
                                <th>FILME</th>
                                <th>AVALIAÇÃO</th>
                                <th>LANÇAMENTO</th>
                                <th>DISPONÍVEL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filmes.map(item => 
                                <tr key={item.id} onClick={() => abrirDetalhes(item.id)}>
                                    <td>#{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.avaliacao}</td>
                                    <td>{item.lancamento.substr(0, 10)}</td>
                                    <td>{item.disponivel ? 'SIM' : 'NÃO'}</td>
                                    <td>
                                        <img src={Editar} alt='editar' 
                                        onClick={e => {
                                            e.stopPropagation(); 
                                            editarFilme(item.id)
                                            }} />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <img src={Remover} alt='remover' 
                                        onClick={e => { 
                                            e.stopPropagation(); 
                                            removerFilmeClick(item.id, item.nome);
                                            }} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}