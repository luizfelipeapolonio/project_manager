// CSS
import styles from "./Project.module.css";

// Components
import ProjectForm from "../../components/ProjectForm";
import Loading from "../../components/Loading";

// Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchProject } from "../../hooks/useFetchProject";
import { useProjectHandle } from "../../hooks/useProjectHandle";

const Project = () => {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    const { id } = useParams();
    const { project, states } = useFetchProject("projects", id);
    const { updateProject, states: updateStates } = useProjectHandle("projects", id);

    console.log("PROJETO INDIVIDUAL", project);

    // Format to a decimal value
    const decimal = (value) => {
        if(value) {
            return Number(value).toFixed(2).replace(".", ",");
        }
    }

    // Show or hide a form
    const toogleShowOrHideForm = () => {
        setShowProjectForm(!showProjectForm);
    }

    // Set currentProject state with project data when edit button is clicked
    useEffect(() => {
        if(project) {
            setCurrentProject(project);
        }
    }, [project]);

    // Set currentProject state with updated project data
    useEffect(() => {
        if(updateStates && updateStates.payload) {
            setCurrentProject(updateStates.payload);
            setShowProjectForm(false);
        }
    }, [updateStates]);

    return(
        <div className={styles.project_container}>
            {states && states.loading && <Loading />}
            {currentProject && (
                <div className={styles.project_info}>
                    <div className={styles.header}>
                        <h1>{currentProject.name}</h1>
                        <button onClick={toogleShowOrHideForm}>
                            {showProjectForm ? "Fechar" : "Editar Projeto"}
                        </button>
                    </div>
                    {!showProjectForm ? (
                        <>
                            <p>Categoria: {currentProject.category}</p>
                            <p>
                                Total do orçamento: R$ {decimal(currentProject.budget)}
                            </p>
                            <p>
                                Total utilizado: R$
                            </p>
                        </>
                    ) : (
                        <div className={styles.form}>
                            {updateStates && updateStates.loading && <Loading />}
                            <ProjectForm
                                title="Editar Projeto"
                                subtitle="Edite as configurações do seu projeto"
                                btnText="Salvar"
                                handleSubmit={updateProject}
                                states={updateStates} 
                                projectData={currentProject} 
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Project;