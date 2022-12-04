// CSS
import styles from "./Project.module.css";

// Components
import ProjectForm from "../../components/ProjectForm";
import Loading from "../../components/Loading";

// Hooks
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchProject } from "../../hooks/useFetchProject";

const Project = () => {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const { id } = useParams();
    const { project, states } = useFetchProject("projects", id);

    console.log("PROJETO INDIVIDUAL", project);

    const decimal = (value) => {
        if(value) {
            return Number(value).toFixed(2).replace(".", ",");
        }
    }

    const toogleShowOrHideForm = () => {
        setShowProjectForm(!showProjectForm);
    }

    return(
        <div className={styles.project_container}>
            {states && states.loading && <Loading />}
            {project && (
                <div className={styles.project_info}>
                    <div className={styles.header}>
                        <h1>{project.name}</h1>
                        <button onClick={toogleShowOrHideForm}>
                            {showProjectForm ? "Fechar" : "Editar Projeto"}
                        </button>
                    </div>
                    {!showProjectForm ? (
                        <>
                            <p>Categoria: {project.category}</p>
                            <p>
                                Total do orçamento: R$ {decimal(project.budget)}
                            </p>
                            <p>
                                Total utilizado: R$
                            </p>
                        </>
                    ) : (
                        <div className={styles.form}>
                            <ProjectForm
                                title="Editar Projeto"
                                subtitle="Edite as configurações do seu projeto"
                                btnText="Salvar"
                                states={states} 
                                projectData={project} 
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Project;