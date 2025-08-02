import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cards.module.css";
import Weapons from "../../data/weapons.json";
import ChooseWeapon from "./chooseWeapon.jsx";
import StatsCard from "./statsCard.jsx";

function PlayerCard({ name, stats, abilities, locationLevel }) {
    const navigate = useNavigate();
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
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (equipedWeapon && equipedWeapon.name) {
            const stats = ultimateWeaponList.includes(equipedWeapon.name)
                ? weaponStats?.[equipedWeapon.name] || {}
                : weaponStats[equipedWeapon.name]?.[locationLevel] || {};

            const text = `Spend ${stats.cost} ${stats.costType || ""}. ${stats.ability} ${stats.use}.`;

            setEquipedWeapon({
                name: equipedWeapon.name,
                text,
            });
        }
    }, [locationLevel]);

    const handleWeaponClick = () => {
        if (isMobile) {
            if (weaponTapped) {
                equipWeapon();
                setWeaponTapped(false);
            } else {
                setWeaponTapped(true);
                setHoveredAbility("weapon");
                setTimeout(() => {
                    setWeaponTapped(false);
                    setHoveredAbility(null);
                }, 5000);
            }
        } else {
            equipWeapon();
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

        <div style={{ display: "block" }}>
            {
                equipingWeapon ? (
                    <div style={playerCardStyle} className={styles.playerCard}>
                        <h1 className={styles.name}>{name}</h1>
                        <div className={styles.addWeapon}>
                            <ChooseWeapon
                                weaponLevel={locationLevel}
                                onRemove={handleRemoveChooseWeapon}
                                onAdd={handleAddEquipedWeapon}
                            />
                        </div>
                    </div>
                ) : (
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
                                <StatsCard type="life" initialValue={stats.life} />
                                <StatsCard type="energy" initialValue={stats.energy} />
                                <StatsCard type="attack" initialValue={stats.attack} />
                                <StatsCard type="shield" initialValue={stats.shield} />
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
                                    onClick={handleWeaponClick}
                                >
                                    Weapon
                                    {hoveredAbility === "weapon" && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: isMobile ? "100%" : "125%",
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
                                            {equipedWeapon ? (<>
                                                <div className={styles.titleSmall}>{equipedWeapon.name}</div>
                                                <div>{equipedWeapon.text}</div>
                                                <div>Click again to change.</div>
                                            </>) : isMobile ? "No Weapon Equiped. Click again to add Weapon" : "No Weapon Equiped. Click to add Weapon"}
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
                )}
        </div >
    );
}

export default PlayerCard;
