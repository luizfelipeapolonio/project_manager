// CSS
import styles from "./ServiceCard.module.css";

// Icon
import { BsTrashFill } from "react-icons/bs";

const ServiceCard = ({ service, handleDelete }) => {

    // Format to a decimal value
    const decimal = (value) => {
        if(value) {
            return Number(value).toFixed(2).replace(".", ",");
        }
    }

    return (
        <div className={styles.servicecard_container}>
            <h2>{service.name}</h2>
            <p className={styles.total_cost}>
                <span>Custo Total:</span> R$ {decimal(service.cost)}
            </p>
            <p className={styles.service_description}>
                {service.description}
            </p>
            <button onClick={() => handleDelete(service)}>
                <BsTrashFill />Excluir
            </button>
        </div>
    );
}

export default ServiceCard;