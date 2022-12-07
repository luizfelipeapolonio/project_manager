// CSS
import styles from "./Project.module.css";

// Components
import ProjectForm from "../../components/ProjectForm";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import ServiceForm from "../../components/ServiceForm";

// Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchProject } from "../../hooks/useFetchProject";
import { useProjectHandle } from "../../hooks/useProjectHandle";

const Project = () => {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [message, setMessage] = useState(null);

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
    // and set message state with message from update request
    useEffect(() => {
        if(updateStates && updateStates.payload) {
            setCurrentProject(updateStates.payload);
            setShowProjectForm(false);
        }
        if(updateStates && updateStates.message) {
            setMessage(updateStates.message);
        }
    }, [updateStates]);

    // Reset component message
    useEffect(() => {
        if(message) {
            const reset = setTimeout(() => {
                setMessage(null);
            }, 1800);

            return () => {
                clearTimeout(reset);
            }
        }
    }, [message]);

    return(
        <div className={styles.project_container}>
            {states && states.loading && <Loading />}
            {message && (
                <Message type={updateStates.actionType} message={message} />
            )}
            {currentProject && (
                <div className={styles.project_info}>
                    <div className={styles.header}>
                        <h1>{currentProject.name}</h1>
                        <button 
                            onClick={toogleShowOrHideForm} 
                            className={styles.project_button}
                        >
                            {showProjectForm ? "Fechar" : "Editar Projeto"}
                        </button>
                    </div>
                    {!showProjectForm ? (
                        <div className={styles.project_data}>
                            <p>
                                <span>Categoria:</span>{currentProject.category}
                            </p>
                            <p>
                                <span>Total do orçamento:</span> 
                                R$ {decimal(currentProject.budget)}
                            </p>
                            <p>
                                <span>Total utilizado:</span> R$
                            </p>
                        </div>
                    ) : (
                        <div className={styles.form}>
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
            <div className={styles.services}>
                <div className={styles.services_header}>
                    <h2>Adicione serviços</h2>
                    <button className={styles.project_button}>
                        Adicionar Serviço
                    </button>
                </div>
                    <ServiceForm />
            </div>
        </div>
    );
}

export default Project;