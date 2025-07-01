import styles from "./footer.module.css";

function Footer() {
  return (
    <>
      <nav className={styles.footer}>
        <div className={styles.text}>
          &copy;{new Date().getFullYear()} IceCream Vacations
        </div>
              <label className={styles.labeled}>by George Tzachristas</label>
      </nav>

    </>
  );
}

export default Footer;
