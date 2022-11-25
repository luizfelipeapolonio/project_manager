// CSS
import styles from "./Loading.module.css";

// Loading image
import loading from "../images/loading.svg";

const Loading = ({ type }) => {
    return (
        <div className={`${styles.container} ${styles[type]}`}>
            <img src={loading} alt="Animação de carregamento" />
            {type === "main" && <p>Carregando...</p>}
        </div>
    );
}

export default Loading;