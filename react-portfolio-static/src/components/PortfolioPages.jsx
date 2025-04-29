import styles from "../styles/all.module.css";

function PortfolioPages() {
    return (
        <>
            <h1 className={styles.sectionTitle}>Portfolio Pages</h1>
            <div className={styles.portfolioPages}>
                <a href="https://icvacations.netlify.app/" target="_blank">
                    <div className={`${styles.projectBox} ${styles.icvImg}`}>
                        <h3 className={styles.textOverlay}>IceCream Vacations</h3>
                    </div>
                </a>
                <a href="https://grandeplayer.netlify.app/player" target="_blank">
                    <div className={`${styles.projectBox} ${styles.gpImg}`}>
                        <h3 className={styles.textOverlay}>Grande Player</h3>
                    </div>
                </a>
                <a href="https://cardwizard.up.railway.app/login" target="_blank">
                    <div className={`${styles.projectBox} ${styles.cwImg}`}>
                        <h3 className={styles.textOverlay}>Card Wizard</h3>
                    </div>
                </a>
            </div>
            <br />
        </>
    )
}

export default PortfolioPages