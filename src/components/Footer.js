// CSS
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <span>Facebook</span>
                <span>Instagram</span>
                <span>Linkedin</span>
            </div>
            <div>
                <p>Project Manager &copy; 2022</p>
            </div>
        </footer>
    );
}

export default Footer;