import styles from "../styles/all.module.css";
import Links from "./Links";

function Header() {
    return (
        <>
            <div className={styles.hero}>
                <Links />
                <div className={styles.overlay}>
                    <img src="/images/homeBGlogo.png" alt="Logo" />
                </div>                
            </div>
            <br />
        </>
    )
}

export default Header