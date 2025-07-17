import { useState, useEffect } from "react";
import styles from "./cards.module.css";

function LocationCard({ level, id, revealed, cleared }) {
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 600);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <div
            className={styles.LocationCard}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                cursor: "pointer",
            }}
        >
            {hovered && (
                <div
                    style={{
                        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
                        position: "absolute",
                        top: "50%",
                        left: isMobile ? "0" : "-200px",
                        transform: isMobile ? "translateY(-50%)" : "translate(-50%, -120%)",
                        backgroundColor: "rgba(73, 5, 110, 0.89)",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "12px",
                        zIndex: 100,
                        fontSize: "1.2rem",
                        pointerEvents: "none",
                        whiteSpace: "pre-wrap",
                        maxWidth: "280px",
                        minWidth: "120px",
                        textAlign: "center",
                    }}
                >
                    Location Level {level} - Reveal Card to see details
                    {cleared ? " (Cleared)" : revealed ? " (Revealed)" : ""}
                </div>
            )}

            <h1 className={styles.level}>{level}</h1>
        </div>
    );
}

export default LocationCard;
