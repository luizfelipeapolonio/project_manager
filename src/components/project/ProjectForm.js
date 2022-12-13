// CSS
import styles from "./ProjectForm.module.css";

// Components
import Message from "../layout/Message";

// Hooks
import { useState, useEffect, useRef } from "react";

const categories = [
    {id: 0, name: "Infra"},
    {id: 1, name: "Desenvolvimento"},
    {id: 2, name: "Design"},
    {id: 3, name: "Planejamento"}
];

const ProjectForm = ({ 
    handleSubmit = null,
     states = null,
     projectData, 
     title, 
     subtitle, 
     btnText }) => {
    const [project, setProject] = useState(projectData || {});
    const [message, setMessage] = useState(null);

    const nameRef = useRef();
    const budgetRef = useRef();
    const categoryRef = useRef();

    const handleOnChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value});
    }

    const submit = async (e) => {
        e.preventDefault();

        if(nameRef.current.value === "" || budgetRef.current.value === "") {
            setMessage(
                "Por favor, dê um nome e defina um orçamento para o projeto!"
            );
            return;
        }

        if(categoryRef.current.value === "default") {
            setMessage("Por favor, selecione a categoria do projeto!");
            return;
        }

        await handleSubmit(project);
    }

    // Set category according to option selected
    const handleSelect = (e) => {
        setProject({
            ...project, 
            [e.target.name]: e.target.options[e.target.selectedIndex].text
        });
    }

    // // Reset component message
    useEffect(() => {
        const reset = setTimeout(() => {
            setMessage(null);
        }, 3500);

        return () => {
            clearTimeout(reset);
        }
    }, [message]);

    return (
        <div className={styles.projectform_container}>
            <h2>{title}</h2>
            <p className={styles.subtitle}>
                {subtitle}
            </p>
            {message && <Message type="error" message={message} />}
            <form className={styles.form} onSubmit={submit}>
                <label>
                    <span>Nome do projeto:</span>
                    <input
                        type="text"
                        name="name"
                        ref={nameRef}
                        placeholder="Dê um nome para o seu projeto"
                        value={project.name || ""}
                        onChange={handleOnChange}
                    />
                </label>
                <label>
                    <span>Orçamento do projeto:</span>
                    <input 
                        type="number"
                        name="budget"
                        ref={budgetRef}
                        placeholder="Orçamento total do seu projeto"
                        value={project.budget || ""}
                        onChange={handleOnChange}
                    />
                </label>
                <label>
                    <span>Selecione a categoria:</span>
                    <select
                        name="category"
                        onChange={handleSelect} 
                        defaultValue={
                            project.category || "default"
                        }
                        ref={categoryRef}
                    >
                        <option value="default" disabled>
                            Selecione uma opção
                        </option>
                        {categories.map((item) => (
                            <option key={item.id}>{item.name}</option>
                        ))}
                    </select>
                </label>
                {states && !states.loading && (
                    <input type="submit" value={btnText} />
                )}
                {states && states.loading && (
                    <input type="submit" value="Aguarde..." disabled />
                )}
            </form>
        </div>
    );
}

export default ProjectForm;