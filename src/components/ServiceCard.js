// CSS
import styles from "./ServiceCard.module.css";

// Icon
import { BsTrashFill } from "react-icons/bs";

// Hooks
import { useState, useEffect } from "react";

const ServiceCard = ({ service, project, handleDelete }) => {
    const [totalSpent, setTotalSpent] = useState("");

    // Format to a decimal value
    const decimal = (value) => {
        if(value) {
            return Number(value).toFixed(2).replace(".", ",");
        }
    }

    // Delete service and update the total spent
    const deleteService = (serviceObject) => {
        const newSpent = parseFloat(totalSpent) - service.cost;

        handleDelete(serviceObject, newSpent.toFixed(2).replace(".", ","));
    }

    // Set total spent state and change comma by dot 
    // to convert to a decimal number
    useEffect(() => {
        if(project && project.totalSpent) {
            setTotalSpent(project.totalSpent.replace(",", "."));
        }
    }, [project]);

    return (
        <div className={styles.servicecard_container}>
            <h2>{service.name}</h2>
            <p className={styles.total_cost}>
                <span>Custo Total:</span> R$ {decimal(service.cost)}
            </p>
            <p className={styles.service_description}>
                {service.description}
            </p>
            <button onClick={() => deleteService(service)}>
                <BsTrashFill />Excluir
            </button>
        </div>
    );
}

export default ServiceCard;