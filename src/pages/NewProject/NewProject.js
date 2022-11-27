import styles from "./NewProject.module.css";

import ProjectForm from "../../components/ProjectForm";

const NewProject = () => {
    return (
        <div className={styles.container}>
            <ProjectForm />
        </div>
    );
}

export default NewProject;