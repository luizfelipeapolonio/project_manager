// CSS
import styles from "./ProjectCard.module.css";

// Icons
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";

// Components
import { Link } from "react-router-dom";

const ProjectCard = ({ project, handleDelete }) => {

    // Format budget to a decimal value
    const decimal = (value) => {
        if(value) {
            return Number(value).toFixed(2).replace(".", ",");
        }
    }

    return (
        <div className={styles.projectcard_container}>
            <h2>{project.name}</h2>
            <div className={styles.infos}>
                <p className={styles.budget}>
                    <span>Orçamento:</span> R$ {decimal(project.budget)}
                </p>
                <p className={styles.category}>
                    <span 
                        className={`${styles[project.category.toLowerCase()]}`}
                    >
                    </span>
                    {project.category}
                </p>
            </div>
            <div className={styles.actions}>
                <Link to={`/project/${project.id}`} className={styles.button}>
                    <BsPencilSquare />Editar
                </Link>
                <button 
                    className={styles.button} 
                    onClick={() => handleDelete(project.id)}
                >
                    <BsTrashFill />Excluir
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;