import { useState, useEffect } from "react";
import styles from "./cards.module.css";
import RemoveButton from "../buttons/RemoveButton";
import StatsCard from "./statsCard.jsx";

function EnemyCard({ name, stats, abilities = [], type, onRemove }) {
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
        backgroundImage: `url(/artworks/${encodeURIComponent(name)}.jpg)`,
    };

    return (
        <div style={{ display: "block" }}>
            <div style={playerCardStyle} className={styles.playerCard}>
                <h1 className={styles.name}>{name}</h1>

                <RemoveButton onClick={onRemove} slot="X" />

                <div className={styles.playerCol}>
                    <div className={styles.stats}
                        style={{
                            marginTop: isMobile ? "10%" : "40%"
                        }}
                    >
                        <StatsCard type="life" initialValue={stats.life} />
                        <StatsCard type="energy" initialValue={stats.energy} />
                        <StatsCard type="attack" initialValue={stats.attack} />
                        <StatsCard type="shield" initialValue={stats.shield} />
                    </div>

                    {/* ENEMY */}
                    {type === "Enemy" && stats.ability && (
                        <div className={styles.abilities}>
                            <div
                                className={styles.ability}
                                onMouseEnter={() => setHoveredAbility(true)}
                                onMouseLeave={() => setHoveredAbility(false)}
                                style={{
                                    cursor: "pointer",
                                    height: isMobile ? "20px" : "40px",
                                    width: isMobile ? "100px" : "100px",
                                    marginTop: isMobile ? "110%" : "200%"
                                }}
                            >
                                Ability
                                {hoveredAbility && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: isMobile ? "-328%" : "-200%",
                                            left: isMobile ? "-175%" : "-207%",
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
                                        {stats.ability}
                                        {stats.abilityTurn ? ` Activates in ${stats.abilityTurn} turn` : ""}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* LEVIATHAN */}
                    {type === "Leviathan" && abilities.length > 0 && (
                        <div className={styles.levithanAbilities}>
                            {abilities.map((ability, index) => (
                                <div
                                    key={index}
                                    className={styles.ability}
                                    onMouseEnter={() => setHoveredAbility(index)}
                                    onMouseLeave={() => setHoveredAbility(null)}
                                    style={{
                                        cursor: "pointer",
                                        height: isMobile ? "20px" : "40px",
                                        width: isMobile ? "140px" : "135px",
                                        marginTop: isMobile ? "10%" : "40%"
                                    }}
                                >
                                    {ability.ability}
                                    {hoveredAbility === index && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: isMobile ? "-295%" : "-202%",
                                                left: isMobile ? "-73%" : "-120%",
                                                backgroundColor: "rgba(73, 5, 110, 0.89)",
                                                boxShadow: "1px 1px 8px black",
                                                border: "1px solid black",
                                                borderRadius: "12px",
                                                color: "white",
                                                padding: "6px 10px",
                                                zIndex: 10,
                                                fontSize: "0.9rem",
                                                pointerEvents: "none",
                                                width: "230px",
                                            }}
                                        >
                                            {ability.text}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>

    );
}

export default EnemyCard;
