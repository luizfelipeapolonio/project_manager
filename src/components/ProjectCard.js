// CSS
import styles from "./ProjectCard.module.css";

// Components
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
    return (
        <div className={styles.projectcard_container}>
            <h2>{project.name}</h2>
            <div className={styles.infos}>
                <p>Orçamento: {project.budget}</p>
                <p>{project.category}</p>
            </div>
            <div className={styles.buttons}>
                <Link to={`/project/${project.id}`}>Editar</Link>
                <button>Excluir</button>
            </div>
        </div>
    );
}

export default ProjectCard;