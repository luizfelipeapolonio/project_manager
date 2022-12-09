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
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchProjects } from "../../hooks/useFetchProjects";
import { useProjectHandle } from "../../hooks/useProjectHandle";

const Projects = () => {
    const [message, setMessage] = useState(null);
    const [actionType, setActionType] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const { projects, states } = useFetchProjects("projects");
    const { deleteProject, states: deleteState } = useProjectHandle("projects");

    console.log("PROJECTS", projects);

    // Reset the message of location state
    const resetLocationState = useCallback(() => {
        navigate(location.pathname, { replace: true });
    }, [location, navigate]);

    // Set message with message from location state
    useEffect(() => {
        if(location.state) {
            setMessage(location.state.message);
            setActionType("success");
            resetLocationState();
        }
    }, [location, resetLocationState]);

    // Set deletion message
    useEffect(() => {
        if(deleteState && deleteState.message) {
            setMessage(deleteState.message);
            setActionType(deleteState.actionType);
        }
    }, [deleteState]);

    // Reset component message
    useEffect(() => {
        if(message) {
            const reset = setTimeout(() => {
                setMessage(null);
                setActionType(null);
            }, 1500);

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
        {projects && projects.length > 0 && (
            <div className={styles.projects_container}>
                {message && (
                    <Message type={actionType} message={message} />
                )}
                <div className={styles.header}>
                    <h2>Meus Projetos</h2>
                    <Link to="/newproject">
                        Criar Projeto
                    </Link>
                </div>
                <div className={styles.projects}>
                    {projects && projects.map((item) => (
                        <ProjectCard 
                            key={item.id} 
                            project={item}
                            handleDelete={deleteProject}
                        />
                    ))}
                </div>
            </div>
        )}
        {!projects && (
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
        {deleteState.loading && <Loading />}
        </>
    );
}

export default Projects;