// CSS
import styles from "./Form.module.css";

// Components
import Message from "../../components/Message";

// React Router
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const { login, states } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");

        const user = {
            email: email,
            password: password
        }

        if(email.length === 0 || password.length === 0) {
            setMessage("Por favor, preencha todos os campos!");
            return;
        }

        await login(user);
    }

    useEffect(() => {
        if(states) {
            if(!states.loading && states.actionType === "error") {
                setMessage(states.message);
            }
        }
    }, [states]);

    // Clear component message
    useEffect(() => {
        const reset = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => {
            clearTimeout(reset);
        }
    }, [message]);

    return (
        <div className={styles.container}>
            <h2>Project Manager</h2>
            <p className={styles.subtitle}>
                Faça o login e comece a gerenciar seus projetos agora mesmo!
            </p>
            {message && (
                <Message 
                    type={states}
                    message={message}
                />
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input 
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input 
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {!states.loading && <input type="submit" value="Entrar" />}
                {states.loading && (
                    <input type="submit" value="Aguarde..." disabled />
                )}
            </form>
            <p className={styles.redirect}>
                Não tem uma conta? <Link to="/register">Clique aqui</Link>
            </p>
        </div>
    );
}

export default Login;