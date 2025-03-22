import styles from "./footer.module.css"

function Footer() {

    return (
        <>
            <div className={styles.footer}>
                <a href="/player" className={styles.trademark}></a>
            </div>
            <label className={styles.labeled}>by George Tzachristas</label>
        </>
    );
}

export default Footer;