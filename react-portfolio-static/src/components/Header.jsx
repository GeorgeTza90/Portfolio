import styles from "../styles/all.module.css";

function Header() {
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.overlay}>
                    <img src="/images/homeBGlogo.png" alt="Logo" />
                </div>
            </div>
            <br />
        </>
    )
}

export default Header