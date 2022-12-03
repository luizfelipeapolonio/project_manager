// CSS
import styles from "./ProjectForm.module.css";

// Components
import Message from "./Message";

// Hooks
import { useState, useEffect } from "react";
import { useProjectHandle } from "../hooks/useProjectHandle";

const categories = [
    {id: 0, name: "Infra"},
    {id: 1, name: "Desenvolvimento"},
    {id: 2, name: "Design"},
    {id: 3, name: "Planejamento"}
];

const ProjectForm = () => {
    const [name, setName] = useState("");
    const [budget, setBudget] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState(null);

    const { insertProject, states } = useProjectHandle("projects");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            budget,
            category
        }

        if(name.length === 0 || budget.length === 0) {
            setMessage(
                "Por favor, dê um nome e defina um orçamento para o projeto!"
            );
            return;
        }

        if(category.length === 0) {
            setMessage("Por favor, selecione a categoria do projeto!");
            return;
        }

        await insertProject(data);
        // console.log(data);
    }

    // Set category according to option selected
    const handleSelect = (e) => {
        setCategory(e.target.options[e.target.selectedIndex].text);
        console.log(e.target.options[e.target.selectedIndex].text);
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
            <h2>Criar Projeto</h2>
            <p className={styles.subtitle}>
                Crie seu projeto para depois adicionar os serviços
            </p>
            {message && <Message type="error" message={message} />}
            {states.message && (
                <Message type={states.actionType} message={states.message} />
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    <span>Nome do projeto:</span>
                    <input
                        type="text"
                        placeholder="Dê um nome para o seu projeto"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Orçamento do projeto:</span>
                    <input 
                        type="number"
                        placeholder="Orçamento total do seu projeto"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </label>
                <label>
                    <span>Selecione a categoria:</span>
                    <select onChange={handleSelect} defaultValue={"default"}>
                        <option value="default" disabled>
                            Selecione uma opção
                        </option>
                        {categories.map((item) => (
                            <option key={item.id}>{item.name}</option>
                        ))}
                    </select>
                </label>
                {!states.loading && <input type="submit" value="Criar" />}
                {states.loading && (
                    <input type="submit" value="Aguarde..." disabled />
                )}
            </form>
        </div>
    );
}

export default ProjectForm;