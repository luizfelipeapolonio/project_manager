// CSS
import styles from "./About.module.css";

// React Router
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={styles.container}>
            <h2>Sobre o Project<span>M</span></h2>
            <p>
                Esta aplicação consiste em um gerenciador de custos de projeto,
                desenvolvido em React JS e o Firebase para armazenamento dos dados e
                autenticação de usuários.
            </p>
            <Link to="/" className="btn">
                Ir para início
            </Link>
        </div>
    );
}

export default About;