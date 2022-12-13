// CSS
import styles from "./Message.module.css";

const Message = ({ type = null, message }) => {
    return (
        <div className={`${styles.message_container} ${styles[type]}`}>
            <p>{message}</p>
        </div>
    );
}

export default Message;