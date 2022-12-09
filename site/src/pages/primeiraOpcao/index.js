import './index.scss'
import logoCamovie from '../../assets/images/logo-Camovie.png'

export default function Index() {
    return (
        <main className='primeiraOpcao'>
            <div className='detalheCima'></div>
            <div className='divOpcoes'>
                <div className='titulo'>
                    <img className='logo' src={logoCamovie} alt='logo Camovie' />
                    <h1 className='tituloOpcao1'> Seja bem-vindo ao Camovie</h1>
                </div>
                <h1 className='tituloOpcao2'> O que deseja fazer? </h1>
                <a href='/login'>
                    <button className='opcoes'>
                        Entrar
                    </button>
                </a>
                <a href='/cadastro'>
                    <button className='opcoes'>
                        Cadastrar-me
                    </button>
                </a>
            </div>
            <div className='detalheBaixo'></div>
        </main>
    )
}