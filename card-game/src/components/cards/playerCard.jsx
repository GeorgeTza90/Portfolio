import { useState } from "react";
import styles from "./cards.module.css";

function PlayerCard({ name, stats, abilities }) {
    const [hoveredAbility, setHoveredAbility] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const playerCardStyle = {
        backgroundImage: `url(/${name}.jpg)`,
    };

    return (
        <div style={{ display: "block" }}>
            <div style={playerCardStyle} className={styles.playerCard}>
                <h1 className={styles.name}>{name}</h1>
                <div className={styles.playerCol}>
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

                    <div className={styles.abilities}>
                        {abilities.map((ability, index) => (
                            <div
                                key={index}
                                className={styles.ability}
                                onMouseEnter={() => setHoveredAbility(index)}
                                onMouseLeave={() => setHoveredAbility(null)}
                                style={{ position: "relative", cursor: "pointer" }}
                            >
                                {ability.ability}

                                {hoveredAbility === index && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: isMobile ? "-40px" : "-60px",
                                            left: isMobile ? "125%" : "20%",
                                            backgroundColor: "rgba(78, 5, 110, 0.97)",
                                            color: "white",
                                            padding: "6px 10px",
                                            borderRadius: "4px",
                                            zIndex: 10,
                                            fontSize: "1rem",
                                            pointerEvents: "none",
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
