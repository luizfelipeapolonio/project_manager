// CSS
import styles from "./ServiceForm.module.css";

// Components
import Message from "./Message";

// Hooks
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const ServiceForm = ({ handleSubmit, states, project }) => {
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");
    // const [service, setService] = useState({});
    const [message, setMessage] = useState(null);

    const [budget, setBudget] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    
    const costRef = useRef();

    const submit = async (e) => {
        e.preventDefault();

        const service = {
            id: uuidv4(),
            name,
            cost: parseFloat(cost),
            description
        }

        const newSpent = parseFloat(totalSpent) + service.cost;

        if(name.length === 0 || 
           cost.length === 0 || 
           description.length === 0) {
            setMessage(
                "Por favor, preencha todos os campos" + 
                " para poder adicionar um serviço"
            );
            return;
        }

        if(cost === "0") {
            setMessage("Preencha o custo do serviço com um valor válido!");
            return;
        }

        if(service.cost > budget || newSpent > budget) {
            setMessage("Orçamento ultrapassado!");
            console.log(typeof newSpent);
            return;
        }

        await handleSubmit(service, newSpent.toFixed(2).replace(".", ","));

        // console.log(parseFloat(totalSpent), budget);
    }

    // Set service state with an object containing the service data
    // const  = (e) => {
    //     setService({
    //         id: uuidv4(),
    //         ...service,
    //         [e.target.name]: e.target.value
    //     });
    // }

    useEffect(() => {
        if(project) {
            setBudget(parseFloat(project.budget));
        }

        if(project && project.totalSpent) {
            setTotalSpent(project.totalSpent.replace(",", "."));
        }
    }, [project]);


    // Reset component message
    useEffect(() => {
        if(message) {
            const reset = setTimeout(() => {
                setMessage(null);
            }, 2800);

            return () => {
                clearTimeout(reset);
            }
        }
    }, [message]);

    return (
        <div className={styles.service_form}>
            <h2>Adicionar serviço</h2>
            <p className={styles.subtitle}>
                Adicione serviços ao seu projeto, mas fique de olho no orçamento...
            </p>
            {message && <Message type="error" message={message} />}
            <form onSubmit={submit}>
                <label>
                    <span>Nome do serviço:</span>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Insira o nome do serviço"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Custo do serviço:</span>
                    <input 
                        type="number"
                        name="cost"
                        placeholder="Coloque o custo do serviço"
                        step=".01"
                        ref={costRef}
                        onChange={(e) => setCost(e.target.value)}
                    />
                </label>
                <label>
                    <span>Descrição:</span>
                    <input 
                        type="text"
                        name="description"
                        placeholder="Diga sobre o que se trata..."
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                {states && states.loading && (
                    <input type="submit" value="Aguarde..." disabled />
                )}
                {states && !states.loading && (
                    <input type="submit" value="Adicionar" />
                )}
            </form>
        </div>
    );
}

export default ServiceForm;