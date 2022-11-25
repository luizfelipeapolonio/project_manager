// CSS
import styles from "./Navbar.module.css";

// Logo
import logo from "../images/icon.png";

// React Router
import { NavLink, Link } from "react-router-dom";

// Context
import { useAuthValue } from "../context/AuthContext";

// Hooks
import { useAuthentication } from "../hooks/useAuthentication";

const Navbar = () => {
    const { logout } = useAuthentication();
    const { user } = useAuthValue();

    console.log("Navbar", user);

    return (
        <nav className={styles.navbar}>
            <div className={styles.app_logo}>
                <Link to="/">
                    <img src={logo} alt="Logo da aplicação" />
                    <h1>Project<span>M</span></h1>
                </Link>
            </div>
            <ul className={styles.links}>
                {user && (
                    <>
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
                    <li onClick={logout}>
                        Sair
                    </li>
                    </>
                )}
                {!user && (
                    <>
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
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;