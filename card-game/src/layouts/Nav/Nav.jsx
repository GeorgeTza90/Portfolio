import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import styles from "./nav.module.css";


function Nav() {
    const navigate = useNavigate();

    return (
        <>
            <nav className={styles.nav}>
                <img src="/logo1.png" alt="" className={styles.img}></img>
            </nav>
        </>
    );
}

export default Nav;