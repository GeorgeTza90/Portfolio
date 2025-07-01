import styles from "./Other.module.css";
import type { JSX } from "react"

interface UnderConstructionProps {
  slot?: string;
}

function UnderConstruction({ slot }: UnderConstructionProps): JSX.Element {
  return (
    <section className={styles.container}>
      {slot || "This page is under construction."}
    </section>
  );
}

export default UnderConstruction;