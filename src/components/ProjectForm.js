import styles from "./ProjectForm.module.css";

const ProjectForm = () => {
    return (
        <div className={styles.container}>
            <h2>Criar Projeto</h2>
            <p>
                Crie seu projeto para depois adicionar os serviços
            </p>
            <form className={styles.form}>
                <label>
                    <span>Nome do projeto:</span>
                    <input
                        type="text"
                        placeholder="Dê um nome para o seu projeto"
                    />
                </label>
                <label>
                    <span>Orçamento do projeto:</span>
                    <input 
                        type="number"
                        placeholder="Orçamento total do seu projeto"
                    />
                </label>
                <label>
                    <span>Selecione a categoria:</span>
                    <select>
                        <option>Selecione uma opção</option>
                    </select>
                </label>
                <input type="submit" value="Criar" />
            </form>
        </div>
    );
}

export default ProjectForm;