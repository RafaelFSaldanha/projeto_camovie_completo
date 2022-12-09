import './index.scss'
import Menu from '../../components/menu/index.js'
import Cabecalho from '../../components/cabecalho/index.js'
import Logo from '../../assets/images/logo-Camovie.png'

export default function Index () {
    return (
        <main className='homeInicial'>
            <Menu selecionado='home' />
            <div className='divPrincipal'>
                <Cabecalho />
                <div className='divImg'>
                    <img src={Logo} alt='Logo' />
                </div>
            </div>
        </main>
    )
}