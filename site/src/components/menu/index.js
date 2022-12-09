import './index.scss'
import storage from 'local-storage'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../../assets/images/logo-Camovie.png'
import Home from '../../assets/images/home.png'
import Cadastrar from '../../assets/images/cadastrar.png'
import Consultar from '../../assets/images/consultar.png'
import Sair from '../../assets/images/sair.png'

export default function Index(props) {

    const navigate = useNavigate();

    function sairClick() {
        storage.remove('usuario-logado');
        navigate('/');
    }

    function verificarMenuSelecionado(menu) {
        if (menu === props.selecionado)
            return 'selecionado'
        else
            return '';
    }

    return (
        <main className='menuLateral'>
            <img className='logoCamovie' src={Logo} alt='Camovie' />
            <div className='divBotoes'>
                <Link to='/home'className={verificarMenuSelecionado('home')}>
                    <img className='imgBotao' src={Home} alt='Home' />
                    <p className='pBotao'> Home </p>
                </Link>
                <Link to='/cadastrar/filme'className={verificarMenuSelecionado('cadastrar')}>
                    <img className='imgBotao' src={Cadastrar} alt='Cadastrar' />
                    <p className='pBotao'> Cadastrar </p>
                </Link>
                <Link to='/consultar/filme'className={verificarMenuSelecionado('consultar')}>
                    <img className='imgBotao' src={Consultar} alt='Consultar' />
                    <p className='pBotao'> Consultar </p>
                </Link>
            </div>
            <button onClick={sairClick} className='botaoSair'>
                <img src={Sair} alt='Sair' />
                <p className='pSair'> Sair </p>
            </button>
        </main>
    )
}