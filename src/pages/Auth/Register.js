// CSS
import styles from "./Form.module.css";

// React Router
import { Link } from "react-router-dom";

// Components
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const { createUser, states } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        // Check each input
        if(name.length === 0 || 
           email.length === 0 || 
           password.length === 0 || 
           confirmPassword.length === 0) {
            return setMessage("Por favor, preencha todos os campos!");
        }

        // Check if password matches
        if(password !== confirmPassword) {
            setMessage("As senhas devem ser iguais");
            return;
        }

        const res = await createUser(user);

        console.log(res);
    }

    // Set message state with message from request
    useEffect(() => {
        if(states) {
            if(!states.loading) {
                setMessage(states.message);
            } 
        }
    }, [states]);


    // Reset component message
    useEffect(() => {
        if(message) {
            const resetMessage = setTimeout(() => {
                setMessage(null);
            }, 3000);

            return () => {
                clearTimeout(resetMessage);
            }
        } 
    }, [message]);

    return (
        <div className={styles.container}>
            <h2>Project Manager</h2>
            <p className={styles.subtitle}>
                Cadastre-se e planeje seus projetos
            </p>
            {message && (
                <Message 
                    type={states}
                    message={message}
                />
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input
                        type="email"
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>Confirmação de senha:</span>
                    <input
                        type="password"
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {!states.loading && <input type="submit" value="Cadastrar" />}
                {states.loading && (
                    <input type="submit" value="Aguarde..." disabled />
                )}
            </form>
            <p className={styles.redirect}>
                Já tem uma conta? <Link to="/login">Clique aqui</Link>
            </p>
        </div>
    );
}

export default Register;