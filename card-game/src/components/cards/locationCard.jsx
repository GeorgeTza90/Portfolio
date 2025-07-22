import { useState, useEffect } from "react";
import styles from "./cards.module.css";

function LocationCard({ level, id, revealed, cleared, name = "Back", stats, onReveal }) {
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isRevealed, setIsRevealed] = useState(revealed);

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
            onClick={onReveal}
            style={{
                backgroundImage: `url(/artworks/${encodeURIComponent(name)}.png)`,
                position: "relative",
                cursor: "pointer",
            }}
        >
            {hovered && (
                <div
                    style={{
                        position: "absolute",
                        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
                        top: isMobile ? "50%" : "105%",
                        left: isMobile ? "-10%" : "50%",
                        transform: isMobile ? "translateY(-50%)" : "translate(-50%, -120%)",
                        backgroundColor: "rgba(73, 5, 110, 0.89)",
                        color: "white",
                        padding: "5px 5px",
                        border: "1px solid black",
                        borderRadius: "12px",
                        zIndex: 100,
                        fontSize: "1.1rem",
                        pointerEvents: "none",
                        whiteSpace: "pre-wrap",
                        maxWidth: "280px",
                        minWidth: "150px",
                        textAlign: "center",
                    }}
                >
                    {name === "Back" ? (<>
                        Location Level {level} - Reveal Card to see details
                        {cleared ? " (Cleared)" : revealed ? " (Revealed)" : ""}
                    </>) : (<>
                        <div
                            style={{
                                fontSize: "1rem",
                                width: "180px",

                            }}
                        >
                            {!stats.encounters ? "" : `Encounters: ${stats.encounters} \n`}
                            {!stats.advantage ? "" : `Advantage: ${stats.advantage} \n`}
                            {!stats.disadvantage ? "" : `Disadvantage: ${stats.disadvantage} \n`}
                        </div>
                    </>)}

                </div>
            )}

            <h1 className={styles.level}>{level}</h1>
        </div>
    );
}

export default LocationCard;
