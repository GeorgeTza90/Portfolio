import styles from "./footer.module.css"

function Footer() {

    return (
        <>
            <div className={styles.footer}>
                <a href="/player" className={styles.trademark}></a>
                <label className={styles.labeled}>by George Tzachristas</label>
            </div>

        </>
    );
}

export default Footer;