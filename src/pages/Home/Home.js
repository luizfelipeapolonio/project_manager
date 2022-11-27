// CSS
import styles from "./Home.module.css";

// Image
import image from "../../images/business.png";

// React Router
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className={styles.container}>
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