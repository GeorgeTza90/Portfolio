import { useState, useEffect } from "react";
import styles from "./cards.module.css";
import ChooseWeapon from "./chooseWeapon.jsx";
import Weapons from "../../data/weapons.json";

function PlayerCard({ name, stats, abilities, locationLevel }) {
    const [hoveredAbility, setHoveredAbility] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [equipingWeapon, setEquipingWeapon] = useState(false);
    const [equipedWeapon, setEquipedWeapon] = useState(null);
    const [weaponTapped, setWeaponTapped] = useState(false);

    const { weaponList, weaponStats, ultimateWeaponList, ultimateWeaponsStats, leviathanAbilities } = Weapons;

    const playerCardStyle = {
        backgroundImage: equipingWeapon
            ? `url(/artworks/${name}_bg.jpg)`
            : `url(/artworks/${name}.jpg)`,
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleWeaponTap = () => {
        if (!isMobile) return;

        if (weaponTapped) {
            equipWeapon();               // Second tap within timeframe → equip
            setWeaponTapped(false);      // Reset tap state
        } else {
            setWeaponTapped(true);       // First tap → show tooltip
            setHoveredAbility("weapon");

            // Optional: reset after 1.5s if second tap doesn't come
            setTimeout(() => {
                setWeaponTapped(false);
                setHoveredAbility(null);
            }, 1500);
        }
    };

    const equipWeapon = () => {
        setEquipingWeapon(true);
    };

    const handleRemoveChooseWeapon = () => {
        setEquipedWeapon(null);
        setEquipingWeapon(false);
    };

    const handleAddEquipedWeapon = (weapon) => {
        setEquipedWeapon(weapon);
        setEquipingWeapon(false);
    };




    return (
        <>
            {equipingWeapon ? (
                <div style={{ display: "block" }}>
                    <div style={playerCardStyle} className={styles.playerCard}>
                        <h1 className={styles.name}>{name}</h1>
                        <div className={styles.playerCol}>
                            <ChooseWeapon
                                weaponLevel={locationLevel}
                                onRemove={handleRemoveChooseWeapon}
                                onAdd={handleAddEquipedWeapon}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ display: "block" }}>
                    <div style={playerCardStyle} className={styles.playerCard}>
                        <h1 className={styles.name}>{name}</h1>
                        <div className={styles.playerCol}>
                            {/* Stats */}
                            <div
                                className={styles.stats}
                                style={{
                                    marginTop: isMobile ? "35%" : "40%",
                                }}
                            >
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

                            {/* Abilities & Weapon*/}
                            <div className={styles.abilities}>
                                <div
                                    className={styles.ability}
                                    style={{
                                        cursor: "pointer",
                                        height: isMobile ? "18px" : "40px",
                                        width: isMobile ? "100px" : "100px",
                                        marginTop: isMobile ? "35%" : "40%",
                                    }}
                                    onMouseEnter={() => !isMobile && setHoveredAbility("weapon")}
                                    onMouseLeave={() => !isMobile && setHoveredAbility(null)}
                                    onClick={handleWeaponTap}
                                >
                                    Weapon
                                    {hoveredAbility === "weapon" && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: isMobile ? "100%" : "-45%",
                                                left: isMobile ? "-175%" : "-207%",
                                                backgroundColor: "rgba(73, 5, 110, 0.89)",
                                                boxShadow: "1px 1px 8px black",
                                                border: "1px solid black",
                                                borderRadius: "12px",
                                                color: "white",
                                                padding: "6px 10px",
                                                zIndex: 10,
                                                fontSize: "0.9rem",
                                                pointerEvents: "none",
                                                width: "280px",
                                            }}
                                        >
                                            {equipedWeapon ? (
                                                <>
                                                    <div className={styles.titleSmall}>{equipedWeapon.name}</div>
                                                    <div>{equipedWeapon.text}</div>
                                                    <div>Click again to change.</div>
                                                </>) : "No Weapon Equiped. Click again to add Weapon"}
                                        </div>
                                    )}
                                </div>
                                {abilities.map((ability, index) => (
                                    <div
                                        key={index}
                                        className={styles.ability}
                                        onMouseEnter={() => setHoveredAbility(index)}
                                        onMouseLeave={() => setHoveredAbility(null)}
                                        style={{
                                            cursor: "pointer",
                                            height: isMobile ? "18px" : "40px",
                                            width: isMobile ? "100px" : "100px",
                                            marginTop: isMobile ? "35%" : "40%",
                                        }}
                                    >
                                        {ability.ability}
                                        {hoveredAbility === index && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: isMobile ? "-255%" : "-145%",
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
                                                {ability.text}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PlayerCard;
