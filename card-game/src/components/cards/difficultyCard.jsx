import { useNavigate } from "react-router-dom";
import styles from "./cards.module.css";
import { useRef } from "react";

function DifficultyCard({ slot = "Click Me", bgI }) {
    const navigate = useNavigate();

    const hoverSoundRef = useRef(null);
    const clickSoundRef = useRef(null);

    const playSound = (ref) => {
        if (ref.current) {
            ref.current.currentTime = 0;
            ref.current.play().catch(() => { });
        }
    };

    const start = () => {
        playSound(clickSoundRef);
        setTimeout(() => {
            navigate("/start", { state: { mode: bgI } });
        }, 2000)

    };

    const handleMouseEnter = () => {
        playSound(hoverSoundRef);
    };

    return (
        <div
            className={styles.difCardWrapper}
            style={{ backgroundImage: `url(/${bgI}.jpg)` }}
            onClick={start}
            onMouseEnter={handleMouseEnter}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") start();
            }}
        >
            <div className={styles.difCardTitle}>{slot}</div>
            <img className={styles.difCardImage} src={`/${bgI}.png`} alt={bgI} />

            {/* Ήχοι */}
            <audio ref={hoverSoundRef} src="/sounds/hover.mp3" preload="auto" />
            <audio ref={clickSoundRef} src="/sounds/click.mp3" preload="auto" />
        </div>
    );
}

export default DifficultyCard;
