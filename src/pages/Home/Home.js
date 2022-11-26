// CSS
import styles from "./Home.module.css";

// Image
import image from "../../images/business.png";

// React Router
import { Link } from "react-router-dom";

// Context
import { useAuthValue } from "../../context/AuthContext";

const Home = () => {
    const { user } = useAuthValue();

    console.log("Home", user);

    return (
        <div className={styles.container}>
            {user.displayName && <h1>Olá, <span>{user.displayName}</span>!</h1>}
            <h2>Seja bem-vindo(a) ao Project<span>M</span></h2>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <Link to="/newproject">
                Criar Projeto
            </Link>
            <img src={image} alt="Imagem de apresentação" />
        </div>
    );
}

export default Home;