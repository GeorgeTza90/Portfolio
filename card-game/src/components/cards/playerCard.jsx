import { useState, useEffect } from "react";
import styles from "./cards.module.css";

function PlayerCard({ name, stats, abilities }) {
    const [hoveredAbility, setHoveredAbility] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const playerCardStyle = {
        backgroundImage: `url(/artworks/${name}.jpg)`,
    };

    return (
        <div style={{ display: "block" }}>
            <div style={playerCardStyle} className={styles.playerCard}>
                <h1 className={styles.name}>{name}</h1>
                <div className={styles.playerCol}>

                    {/* Stats */}
                    <div className={styles.stats}>
                        <div className={styles.specStat}>
                            <img src="/life.png" alt="life" className={styles.statsImg} />
                            {stats.life}
                        </div>
                        <div className={styles.specStat}>
                            <img src="/energy.png" alt="energy" className={styles.statsImg} />
                            {stats.energy}
                        </div>
                        <div className={styles.specStat}>
                            <img src="/attack.png" alt="attack" className={styles.statsImg} />
                            {stats.attack}
                        </div>
                        <div className={styles.specStat}>
                            <img src="/shield.png" alt="shield" className={styles.statsImg} />
                            {stats.shield}
                        </div>
                    </div>

                    {/* Abilities */}
                    <div className={styles.abilities}>
                        {abilities.map((ability, index) => (
                            <div
                                key={index}
                                className={styles.ability}
                                onMouseEnter={() => setHoveredAbility(index)}
                                onMouseLeave={() => setHoveredAbility(null)}
                                style={{
                                    cursor: "pointer",
                                    height: isMobile ? "20px" : "40px",
                                    width: isMobile ? "100px" : "100px",
                                    marginTop: isMobile ? "20%" : "40%"
                                }}
                            >
                                {ability.ability}
                                {hoveredAbility === index && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: isMobile ? "0%" : "-145%",
                                            left: isMobile ? "-250%" : "-207%",
                                            backgroundColor: "rgba(73, 5, 110, 0.89)",
                                            boxShadow: "1px 1px 8px black",
                                            border: "1px solid black",
                                            borderRadius: "12px",
                                            color: "white",
                                            padding: "6px 10px",
                                            zIndex: 10,
                                            fontSize: "1rem",
                                            pointerEvents: "none",
                                            width: "280px",
                                        }}
                                    >
                                        {ability.text}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PlayerCard;
