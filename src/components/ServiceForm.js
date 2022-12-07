// CSS
import styles from "./ServiceForm.module.css";

const ServiceForm = () => {
    return (
        <form className={styles.service_form}>
            <label>
                <span>Nome do serviço:</span>
                <input 
                    type="text" 
                    placeholder="Insira o nome do serviço"    
                />
            </label>
            <label>
                <span>Custo do serviço:</span>
                <input 
                    type="number"
                    placeholder="Coloque o custo do serviço"
                />
            </label>
            <label>
                <span>Descrição:</span>
                <input 
                    type="text"
                    placeholder="Diga sobre o que se trata..."
                />
            </label>
            <input type="submit" value="Adicionar" />
        </form>
    );
}

export default ServiceForm;