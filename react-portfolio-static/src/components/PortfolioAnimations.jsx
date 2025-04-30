import styles from "../styles/all.module.css";
import { useState } from "react";

function PortfolioAnimations() {
    const [videoSrc1, setVideoSrc1] = useState("/videos/hna-hover.mp4");
    const [videoSrc2, setVideoSrc2] = useState("/videos/bt-hover.mp4");
    return (
        <>
            <h1 className={styles.sectionTitle}>Animated Videos</h1>
            <div className={styles.portfolioAnimation}>
                <a href="https://www.youtube.com/watch?v=MUzcgtwxnr8" target="_blank">
                    <div className={styles.projectBox}
                        onMouseEnter={() => setVideoSrc1("/videos/hna.mp4")}
                        onMouseLeave={() => setVideoSrc1("/videos/hna-hover.mp4")}
                    >
                        <video className={styles.bgVideo} autoPlay loop muted playsInline src={videoSrc1}></video>
                    </div>
                </a>
                <a href="https://www.youtube.com/watch?v=j1aYszgIKAs" target="_blank">
                    <div className={styles.projectBox}
                        onMouseEnter={() => setVideoSrc2("/videos/bt.mp4")}
                        onMouseLeave={() => setVideoSrc2("/videos/bt-hover.mp4")}
                    >
                        <video className={styles.bgVideo} autoPlay loop muted playsInline src={videoSrc2}></video>
                    </div>
                </a>
            </div>
            <br /><br />
        </>
    )
}

export default PortfolioAnimations