import './index.scss'
import Menu from '../../components/menu/index.js'
import Cabecalho from '../../components/cabecalho/index.js'
import { cadastrarFilme, enviarImagemFilme, alterarFilme, buscarPorId, buscarImagem } from '../../api/filmeApi'
import { useEffect, useState } from 'react'
import storage from 'local-storage'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import Upload from '../../assets/images/upload.png'

export default function Index() {
    const [nome, setNome] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [avaliacao, setAvaliacao] = useState(0);
    const [disponivel, setDisponivel] = useState(false);
    const [lancamento, setLancamento] = useState('');
    const [imagem, setImagem] = useState();
    const [id, setId] = useState(0);

    const { idParam } = useParams();

    useEffect(() => {
        if(idParam) {
            carregarFilme();
        }
    }, [])

    async function carregarFilme() {
        const resposta = await buscarPorId(idParam);
        setNome(resposta.nome);
        setSinopse(resposta.sinopse);
        setAvaliacao(resposta.avaliacao);
        setDisponivel(resposta.disponivel);
        setLancamento(resposta.lancamento.substr(0, 10));
        setId(resposta.id);
        setImagem(resposta.imagem);
    }

    async function salvarClick() {
        try {
            if (!imagem)
                throw new Error('A capa do filme é obrigatória!')
            const usuario = storage('usuario-logado').id;
            if (id === 0) {
                const novoFilme  = await cadastrarFilme(nome, avaliacao, lancamento, disponivel, sinopse, usuario);
                await enviarImagemFilme(novoFilme.id, imagem);
                setId(novoFilme.id);
                toast.success('Filme cadastrado com sucesso!');
            }
            else {
                await alterarFilme(id, nome, avaliacao, lancamento, disponivel, sinopse, usuario);
                if (typeof(imagem) == 'object')
                await enviarImagemFilme(id, imagem);
                toast.success('Filme alterado com sucesso!');
            }
        }
        catch (err) {
            if (err.response)
                toast.error(err.response.data.erro);
            else
                toast.error(err.message);
        }
    }

    function escolherImagem() {
        document.getElementById('imagemCapa').click();
    }

    function mostrarImagem() {
        if (typeof(imagem) == 'object') {
            return URL.createObjectURL(imagem);
        }
        else {
            return buscarImagem(imagem);
        }
    }

    function novoClick() {
        setId(0);
        setNome('');
        setAvaliacao(0);
        setLancamento('');
        setDisponivel(false);
        setSinopse('');
        setImagem();
    }

    return (
        <main className='cadastrarFilme'>
            <Menu selecionado='cadastrar' />
            <div className='divPrincipal'>
                <Cabecalho />
                <div className='divCadastrar'>
                    <div className='divCadastro'>
                        <h1 className='h1Cadastrar'> Cadastrar Filme </h1>
                        <div className='div1'>
                            <div className='divUpload' onClick={escolherImagem}>
                                {!imagem &&
                                    <img src={Upload} alt='upload' />
                                }
                                {imagem &&
                                    <img className='capa' src={mostrarImagem()} alt='' />
                                }
                                <input type='file' id='imagemCapa' onChange={e => setImagem(e.target.files[0])} />
                            </div>
                            <div className='div2'>
                                <div className='divInputs'>
                                    Nome: <input className='inputNome' type='text' placeholder='Nome do Filme' value={nome} onChange={e => setNome(e.target.value)} />
                                </div>
                                <div className='divInputs'>
                                    Lançamento: <input className='input' type='date' value={lancamento} onChange={e => setLancamento(e.target.value)} />
                                </div>
                                <div className='divInputs'>
                                    Avaliação: <input className='inputAvaliacao' type='number' value={avaliacao} onChange={e => setAvaliacao(e.target.value)} />
                                </div>
                                <div className='divInputs'>
                                    <input className='inputCheckbox' type='checkbox' checked={disponivel} onChange={e => setDisponivel(e.target.checked)} /> Disponível
                                </div>
                            </div>
                            <div className='div3'>
                                Sinopse: <textarea className='inputSinopse' type='text' placeholder='Sinopse do Filme' value={sinopse} onChange={e => setSinopse(e.target.value)} />
                            </div>
                        </div>
                        <div className='divBotoes'>
                            <button className='botaoCadastrar' onClick={novoClick}> Novo </button>
                            <button className='botaoCadastrar' onClick={salvarClick}> {id === 0 ? 'Cadastrar' : 'Alterar'} </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}