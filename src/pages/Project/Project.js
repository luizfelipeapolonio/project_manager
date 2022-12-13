// CSS
import styles from "./Project.module.css";

// Components
import ProjectForm from "../../components/project/ProjectForm";
import Loading from "../../components/layout/Loading";
import Message from "../../components/layout/Message";
import ServiceForm from "../../components/service/ServiceForm";
import ServiceCard from "../../components/service/ServiceCard";

// Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchProject } from "../../hooks/useFetchProject";
import { useProjectHandle } from "../../hooks/useProjectHandle";
import { useServiceHandle } from "../../hooks/useServiceHandle";

const Project = () => {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [message, setMessage] = useState(null);
    const [actionType, setActionType] = useState(null);

    const { id } = useParams();
    const { project, states } = useFetchProject("projects", id);
    const { updateProject, states: updateStates } = useProjectHandle("projects", id);
    const { 
        insertService, 
        deleteService, 
        states: serviceStates 
    } = useServiceHandle("projects", id);

    // Format to a decimal value
    const decimal = (value) => {
        if(value) {
            return Number(value).toFixed(2).replace(".", ",");
        }
    }

    // Show or hide the project form
    const toggleVisibilityProjectForm = () => {
        setShowProjectForm(!showProjectForm);
    }

    // Show or hide the service form
    const toggleVisibilityServiceForm = () => {
        setShowServiceForm(!showServiceForm);
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
            setActionType(updateStates.actionType);
        }
    }, [updateStates]);

    // Set message state with message from service request
    useEffect(() => {
        if(serviceStates && serviceStates.payload) {
            setCurrentProject(serviceStates.payload);
            setShowServiceForm(false);
        }
        if(serviceStates && serviceStates.message) {
            setMessage(serviceStates.message);
            setActionType(serviceStates.actionType);
        }
    }, [serviceStates]);

    // Reset component message
    useEffect(() => {
        if(message) {
            const reset = setTimeout(() => {
                setMessage(null);
                setActionType(null);
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
                <Message type={actionType} message={message} />
            )}
            {currentProject && (
                <div className={styles.project_info}>
                    <div className={styles.header}>
                        <h1>{currentProject.name}</h1>
                        <button 
                            onClick={toggleVisibilityProjectForm} 
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
                                <span>Total utilizado:</span> 
                                R$ {currentProject.totalSpent ? 
                                    currentProject.totalSpent : 0}
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
            {currentProject && !states.loading && (
                <>
                    <div className={styles.services}>
                        <div className={styles.services_header}>
                            <h2>Adicione serviços</h2>
                            <button 
                                className={styles.project_button}
                                onClick={toggleVisibilityServiceForm}
                            >
                                {showServiceForm ? "Fechar" : "Adicionar Serviço"}
                            </button>
                        </div>
                        {showServiceForm && (
                            <ServiceForm 
                                project={currentProject}
                                states={serviceStates} 
                                handleSubmit={insertService}
                            />
                        )}   
                    </div>
                    <div className={styles.show_services}>
                        <h2>Serviços</h2>
                        {serviceStates && serviceStates.loading ? <Loading /> : (
                            <div className={styles.services_container}>
                                {currentProject && currentProject.services && 
                                    currentProject.services.length > 0 ? (
                                        currentProject.services.map((service) => (
                                            <ServiceCard 
                                                key={service.id} 
                                                service={service} 
                                                project={currentProject}
                                                handleDelete={deleteService}
                                            />
                                        ))
                                    ) : (
                                        <p>Não há serviços cadastrados</p>
                                    )
                                }
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Project;