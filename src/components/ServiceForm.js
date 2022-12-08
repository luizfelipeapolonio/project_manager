// CSS
import styles from "./ServiceForm.module.css";

// Components
import Message from "./Message";

// Hooks
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const ServiceForm = ({ handleSubmit, states }) => {
    // const [name, setName] = useState("");
    // const [cost, setCost] = useState("");
    // const [description, setDescription] = useState("");
    const [service, setService] = useState({});
    const [message, setMessage] = useState(null);

    const nameRef = useRef();
    const costRef = useRef();
    const descriptionRef = useRef();

    const submit = async (e) => {
        e.preventDefault();

        // const service = {
        //     id: uuidv4(),
        //     name,
        //     cost,
        //     description
        // }

        if(nameRef.current.value === "" || 
           costRef.current.value === "" || 
           descriptionRef.current.value === "") {
            setMessage(
                "Por favor, preencha todos os campos" + 
                " para poder adicionar um serviço"
            );
            return;
        }

        await handleSubmit(service);

        console.log(service);
    }

    // Set service state with an object containing the service data
    const handleOnChange = (e) => {
        setService({
            id: uuidv4(),
            ...service,
            [e.target.name]: e.target.value
        });
    }


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
                        ref={nameRef}
                        onChange={handleOnChange}
                    />
                </label>
                <label>
                    <span>Custo do serviço:</span>
                    <input 
                        type="number"
                        name="cost"
                        placeholder="Coloque o custo do serviço"
                        ref={costRef}
                        onChange={handleOnChange}
                    />
                </label>
                <label>
                    <span>Descrição:</span>
                    <input 
                        type="text"
                        name="description"
                        placeholder="Diga sobre o que se trata..."
                        ref={descriptionRef}
                        onChange={handleOnChange}
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