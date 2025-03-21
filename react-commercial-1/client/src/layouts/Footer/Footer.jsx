import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <nav className={styles.footer}>
        <div className={styles.text}>
          &copy;{new Date().getFullYear()} IceCream Vacations
        </div>
      </nav>
      <label className={styles.labeled}>by George Tzachristas</label>
    </>
  );
}

export default Footer;
