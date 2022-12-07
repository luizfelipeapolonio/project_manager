// CSS
import styles from "./NewProject.module.css";

// Components
import ProjectForm from "../../components/ProjectForm";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useProjectHandle } from "../../hooks/useProjectHandle";

const NewProject = () => {
    const [message, setMessage] = useState(null);
    const { insertProject, states } = useProjectHandle("projects");

    // Set message state with message from create project request
    useEffect(() => {
        if(states && states.message) {
            setMessage(states.message);
        }
    }, [states]);

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

    return (
        <div className={styles.container}>
            {message && <Message type={states.actionType} message={message} />}
            <ProjectForm
                title="Criar Projeto"
                subtitle="Crie seu projeto para depois adicionar os serviços"
                btnText="Criar"
                handleSubmit={insertProject}
                states={states}
            />
        </div>
    );
}

export default NewProject;