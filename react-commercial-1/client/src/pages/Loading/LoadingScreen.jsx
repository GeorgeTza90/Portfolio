import styles from "./loadingScreen.module.css";


function LoadingScreen() {


    return (
        <div className={styles.loadingContainer}>
            <video autoPlay loop muted className={styles.video}>
                <source src="/LOADING1.mov" type="video/mp4" />
            </video>
        </div>
    );
};

export default LoadingScreen;
