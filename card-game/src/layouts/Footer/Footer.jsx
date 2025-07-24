import styles from "./footer.module.css"

function Footer() {

    return (
        <>
            <div className={styles.footer}>
                <a href="/player" className={styles.trademark}></a>
                <label className={styles.labeled}> &copy;{new Date().getFullYear()} by George Tzachristas</label>
            </div>

        </>
    );
}

export default Footer;