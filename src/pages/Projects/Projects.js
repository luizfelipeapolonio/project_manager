// CSS
import styles from "./Projects.module.css";

// Image
import image from "../../images/rocket.png";

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
            }, 2000);

            return () => {
                clearTimeout(reset);
            }
        }
    }, [message]);

    // console.log("Message state", message);
    // if(location.state) {
    //     console.log("LOCATION ", location);
    // }

    console.log(states);

    return (
        <>
        {project && project.length > 0 && (
            <div className={styles.projects_container}>
                {message && (
                    <Message type="success" message={message} />
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
        )}
        {!project && (
            <div className={styles.noprojects}>
                <h3>Não há projetos ainda!</h3>
                <p>Vamos começar?</p>
                <Link to="/newproject" className="btn">
                    Criar primeiro projeto
                </Link>
                <img src={image} alt="Imagem de início" />
          </div>
        )}
        {states.loading && <Loading />}
        </>
    );
}

export default Projects;