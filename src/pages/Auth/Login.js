// React Router
import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");

        const login = {
            email: email,
            password: password
        }

        console.log(login);
    }

    return (
        <div id="form">
            <h2>Project Manager</h2>
            <p id="subtitle">
                Faça o login e comece a gerenciar seus projetos agora mesmo!
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input 
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input 
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Enviar" />
            </form>
            <p id="redirect">
                Não tem uma conta? <Link to="/register">Clique aqui</Link>
            </p>
        </div>
    );
}

export default Login;