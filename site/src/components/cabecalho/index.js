import './index.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import storage from 'local-storage'

export default function Index() {
    const [usuario, setUsuario] = useState('-');

    const navigate = useNavigate();

    useEffect(() => {
        if (!storage('usuario-logado')) {
            navigate('/');
        }
        else {
            const usuarioLogado = storage ('usuario-logado');
            setUsuario(usuarioLogado.nome);
        }
    }, [])

    return (
        <main>
            <header className='cabecalho'>
                <p className='fraseCabecalho'> Seja bem-vindo, {usuario}!</p>
                <div className='elipse'>
                    {usuario[0].toUpperCase()}
                </div>
            </header>
        </main>
    )
}