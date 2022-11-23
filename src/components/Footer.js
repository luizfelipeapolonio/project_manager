// CSS
import styles from "./Footer.module.css";

// Icons
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.icons}>
                <span><BsFacebook /></span>
                <span><BsGithub /></span>
                <span><BsLinkedin /></span>
            </div>
            <div className={styles.copy}>
                <p>Project Manager &copy; 2022</p>
            </div>
        </footer>
    );
}

export default Footer;