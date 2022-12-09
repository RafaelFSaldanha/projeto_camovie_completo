import './index.scss'
import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import Detalhe from '../../components/detalhe'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { buscarPorId } from '../../api/filmeApi'

export default function Index() {
    const [filme, setFilme] = useState({});
    const { idParam } = useParams();

    useEffect(() => {
        carregarFilme();
    }, []);

    async function carregarFilme() {
        const resposta = await buscarPorId(idParam);
        setFilme(resposta);
    }

    return (
        <main className='page page-detalhe'>
            <Menu />
            <div className='container'>
                <Cabecalho />
                <div className='conteudo'>
                    <Detalhe filme={filme} />
                </div>
            </div>
        </main>
    )
}