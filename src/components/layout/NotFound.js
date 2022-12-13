// CSS
import styles from "./NotFound.module.css";

// Icon
import { BsFillExclamationOctagonFill } from "react-icons/bs";

const NotFound = () => {
    return (
        <div className={styles.notfound_container}>
            <BsFillExclamationOctagonFill />
            <h1>Oops!</h1>
            <p>404 - Page not found</p>
        </div>
    );
}

export default NotFound;