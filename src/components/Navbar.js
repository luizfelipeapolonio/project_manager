// CSS
import styles from "./Navbar.module.css";

// Logo
import logo from "../images/icon.png";

// React Router
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.app_logo}>
                <Link to="/">
                    <img src={logo} alt="Logo da aplicação" />
                    <h1>Project<span>M</span></h1>
                </Link>
            </div>
            <ul className={styles.links}>
                <li>
                    <NavLink 
                        to="/"
                        className={({isActive}) => (isActive ? styles.active : "")}
                        end
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/projects"
                        className={({isActive}) => (isActive ? styles.active : "")}
                    >
                        Projetos
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({isActive}) => isActive ? styles.active : ""}
                    >
                        Sobre
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/login"
                        className={({isActive}) => isActive ? styles.active : ""}
                    >
                        Entrar
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/register"
                        className={({isActive}) => isActive ? styles.active : ""}
                    >
                        Cadastrar
                    </NavLink>
                </li>
                <li>Sair</li>
            </ul>
        </nav>
    );
}

export default Navbar;