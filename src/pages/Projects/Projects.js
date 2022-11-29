// CSS
import styles from "./Projects.module.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import ProjectCard from "../../components/ProjectCard";
import Loading from "../../components/Loading";

// Hooks
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFetchProjects } from "../../hooks/useFetchProjects";

const Projects = () => {
    const [message, setMessage] = useState(null);
    const location = useLocation();

    const { project, states } = useFetchProjects("projects");

    console.log("PROJECTS", project);

    useEffect(() => {
        if(location.state) {
            setMessage(location.state);
        }
    }, [location]);

    // Reset component message
    useEffect(() => {
        if(message) {
            const reset = setTimeout(() => {
                setMessage(null);
            }, 3000);

            return () => {
                clearTimeout(reset);
            }
        }
    }, [message]);

    // console.log("Message state", message);
    // if(location.state) {
    //     console.log("LOCATION ", location);
    // }

    return (
        <>
            {project ? (
                <div className={styles.projects_container}>
                    {message && (
                        <Message type="success" message={location.state} />
                    )}
                    <div className={styles.header}>
                        <h2>Meus Projetos</h2>
                        <Link to="/newproject">
                            Criar Projeto
                        </Link>
                    </div>
                    <div className={styles.projects}>
                        {project && project.map((item) => (
                            <ProjectCard 
                                key={item.id} 
                                project={item}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Não há projetos ainda</p>
            )}
        </>
    );
}

export default Projects;