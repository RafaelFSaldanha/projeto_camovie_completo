import './index.scss'
import { cadastro } from '../../api/usuarioApi.js'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import storage from 'local-storage'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

export default function Index() {
    const [nome, setNome] = useState ('');
    const [email, setEmail] = useState ('');
    const [senha, setSenha] = useState ('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState('');

    const navigate = useNavigate();
    const ref = useRef ();

    useEffect(() => {
        if (storage('usuario-logado')) {
            navigate('/home');
        }
    }, [])

    async function cadastrarClick() {
        ref.current.continuousStart();
        setCarregando(true);
        
        try {
            const r = await cadastro (nome, email, senha);
            storage('usuario-logado', r);
            toast.success('Cadastrado com sucesso!');
            setTimeout(() => {
                navigate('/login');
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
        <main className='cadastrarUsuario'>
            <LoadingBar color='#970000' ref={ref} />
            <div className='detalheCima'></div>
            <div className='divCadastro'>
                <h1 className='tituloCadastro'> Cadastro </h1>
                <div className='divInputs'>
                    <div className='inputGroup'>
                        <input type='text' className='input' placeholder= " " value={nome} onChange={e => setNome(e.target.value)} />
                        <label className='placeholder'> Nome </label>
                    </div>
                    <div className='inputGroup'>
                        <input type='text' className='input' placeholder= " " value={email} onChange={e => setEmail(e.target.value)} />
                        <label className='placeholder'> Email </label>
                    </div>
                    <div className='inputGroup'>
                        <input type='password' className='input' placeholder= " " value={senha} onChange={e => setSenha(e.target.value)} />
                        <label className='placeholder'> Senha </label>
                    </div>
                    <div className='erro'>
                        {erro}
                    </div>
                </div>
                <button className='botaoCadastrar' onClick={cadastrarClick} disabled={carregando}> Cadastrar </button>
                <p className='pBaixo'> Já possue uma conta? <a href='/login' className='aPBaixo'> Entrar </a></p>
            </div>
            <div className='detalheBaixo'></div>
        </main>
    )
}