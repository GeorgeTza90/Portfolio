import styles from "./heading.module.css";
import type { HeadingProps } from "../../types/types";

const Heading = ({ heading = "Current Page" }: HeadingProps) => {
    return (   
        <div className={styles.heading}>
            <h2>{heading}</h2>
        </div>
    );
}

export default Heading;
