// CSS
import styles from "./Message.module.css";

const Message = ({ type, message }) => {
    return (
        <div className={`${styles.container} ${styles[type.actionType]}`}>
            <p>{message}</p>
        </div>
    );
}

export default Message;