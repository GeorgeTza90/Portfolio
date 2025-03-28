import styles from "./heading.module.css";


function Heading({ heading = "Current Page" }) {
  return (
    <div className={styles.heading}>
      <h2>{heading}</h2>
    </div>
  );
}

export default Heading;
