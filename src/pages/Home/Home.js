// CSS
import styles from "./Home.module.css";

// Image
import image from "../../images/business.png";

// Components
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Home = () => {
    const [userName, setUserName] = useState(null);
    const { auth } = useAuthentication();

    const currentUser = auth.currentUser;

    useEffect(() => {
        if(currentUser.displayName) {
            setUserName(currentUser.displayName);
            sessionStorage.clear();

            // console.log("TEM DISPLAYNAME");
        }else {
            const name = sessionStorage.getItem("userName");
            setUserName(name);

            // console.log("NÃO TEM DISPLAYNAME");
        }
    }, [currentUser]);

    // console.log("HOME USER", currentUser);

    return (
        <div className={styles.home_container}>
            {!userName && <Loading />}
            {userName && (
                <h1>
                    Olá, <span>{userName}</span>!
                </h1>
            )}
            <h2>Seja bem-vindo(a) ao Project<span>M</span></h2>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <Link to="/newproject" className="btn">
                Criar Projeto
            </Link>
            <img src={image} alt="Imagem de apresentação" />
        </div>
    );
}

export default Home;