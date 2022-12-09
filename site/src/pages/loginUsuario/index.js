import './index.scss'
import { login } from '../../api/usuarioApi.js'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'  
import storage from 'local-storage'

export default function Index() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState('');

    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        if (storage('usuario-logado')) {
            navigate('/home');
        }
    }, [])

    async function entrarClick() {
        ref.current.continuousStart();
        setCarregando(true);
        try {
            const r = await login (email, senha);
            storage('usuario-logado', r);
            setTimeout(() => {
                navigate('/home');
            }, 3000);
        }
        catch (err) {
            ref.current.complete();
            setCarregando(false);
            if (err.response.status === 401) {
                setErro(err.response.data.erro);
            }
        }
    }

    return (
        <main className='loginUsuario'>
            <LoadingBar color='#970000' ref={ref} />
            <div className='detalheCima'></div>
            <div className='divLogin'>
                <h1 className='tituloLogin'> Login </h1>
                <div className='inputGroup'>
                    <input type='text' className='input' placeholder=" " value={email} onChange={e => setEmail(e.target.value)} />
                    <label className='placeholder'> Email </label>
                </div>
                <div className='inputGroup'>
                    <input type='password' className='input' placeholder=" " value={senha} onChange={e => setSenha(e.target.value)} />
                    <label className='placeholder'> Senha </label>
                </div>
                <div className='erro'>
                    {erro}
                </div>
            </div>
            <button className='botaoLogar' onClick={entrarClick} disabled={carregando}> Entrar </button>
            <p className='pBaixo'> Ainda não possue uma conta? <a href='/cadastro' className='aPBaixo'> Cadastrar-me </a></p>
            <div className='detalheBaixo'></div>
        </main>
    )
}