import styles from "./loadingScreen.module.css";
import type { FC } from "react";

const LoadingScreen: FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <video autoPlay loop muted className={styles.video}>
                <source src="/LOADING1.mov" type="video/mp4" />
            </video>
        </div>
    );
};

export default LoadingScreen;
