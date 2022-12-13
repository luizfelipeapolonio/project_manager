// CSS
import styles from "./Navbar.module.css";

// Logo
import logo from "../../images/icon.png";

// Icons
import { BsList, BsXLg } from "react-icons/bs";

// React Router
import { NavLink, Link } from "react-router-dom";

// Context
import { useAuthValue } from "../../context/AuthContext";

// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Navbar = () => {
    const [toggleVisibility, setToggleVisibility] = useState(false);
    const classOn = toggleVisibility ? "on" : "";

    const { logout } = useAuthentication();
    const { user } = useAuthValue();

    // Change the visibility of the fullscreen menu
    const showOrHideMenu = () => {
        setToggleVisibility(!toggleVisibility);
    }

    // Close menu when route link is clicked
    const hideMenu = () => {
        setToggleVisibility(false);
    }

    // Check visibility and change the body overflow
    useEffect(() => {
        if(toggleVisibility) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "initial";
        }
    }, [toggleVisibility]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.app_logo}>
                <Link to="/">
                    <img src={logo} alt="Logo da aplicação" />
                    <h1>Project<span>M</span></h1>
                </Link>
            </div>
            <div className={styles.toggle_menu} onClick={showOrHideMenu}>
                {toggleVisibility ? (
                    <BsXLg className={styles.xbutton} />
                ) : <BsList />}
            </div>
            <ul className={`${styles.links} ${styles[classOn]}`}>
                {user && (
                    <>
                        <li>
                            <NavLink 
                                to="/"
                                className={({isActive}) => (isActive ? styles.active : "")}
                                onClick={hideMenu}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/projects"
                                className={({isActive}) => (isActive ? styles.active : "")}
                                onClick={hideMenu}
                            >
                                Projetos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({isActive}) => isActive ? styles.active : ""}
                                onClick={hideMenu}
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
                            onClick={hideMenu}
                        >
                            Entrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/register"
                            className={({isActive}) => isActive ? styles.active : ""}
                            onClick={hideMenu}
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