// CSS
import styles from "./NewProject.module.css";

// Components
import ProjectForm from "../../components/ProjectForm";

// Hooks
import { useProjectHandle } from "../../hooks/useProjectHandle";

const NewProject = () => {
    const { insertProject, states } = useProjectHandle("projects");

    return (
        <div className={styles.container}>
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