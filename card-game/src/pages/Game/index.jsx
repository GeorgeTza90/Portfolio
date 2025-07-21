import { useLocation } from "react-router-dom";
import { useState } from "react";
import Location from "../../components/cards/locationCard.jsx";
import Player from "../../components/cards/playerCard.jsx";
import Enemy from "../../components/cards/enemyCard.jsx"
import styles from "../../components/cards/cards.module.css";
import Players from "../../data/players.json";
import Locations from "../../data/locations.json";
import Enemies from "../../data/enemies.json";

function Game() {
    const location = useLocation();
    const [locationBG, setLocationBG] = useState("");
    const { mode } = location.state || {};
    const { playersStats, playersAbilities } = Players;
    const { levels } = Locations;
    const { enemiesList, enemiesStats } = Enemies;
    const [activeLocation, setActiveLocation] = useState();

    const [enemyList, setEnemyList] = useState([]);
    const [selectingEnemy, setSelectingEnemy] = useState(false);
    const [selectedEnemy, setSelectedEnemy] = useState("");
    const [selectedEnemyLevel, setSelectedEnemyLevel] = useState("");
    const [addEnemySymbol, setAddEnemySymbol] = useState("+");

    const tabBackground = {
        backgroundImage: locationBG === "" ? "url(/bg3.jpg)" : `url(/${locationBG}.jpg)`,
    };

    const handleConfirmAddEnemy = () => {
        if (!selectedEnemy) return;

        const level = selectedEnemyLevel;
        const stats = enemiesStats[selectedEnemy]?.[level] || {};

        const newEnemy = {
            name: selectedEnemy,
            stats: stats,
            abilities: stats.ability ? [stats.ability] : [],
        };

        setEnemyList(prev => [...prev, newEnemy]);
        setSelectingEnemy(false);
        setSelectedEnemy("");
    };

    console.log(Enemies);

    return (
        <>
            <div className={styles.gameContainer}>

                {/* Locations */}
                <div style={tabBackground} className={styles.tabBackground}>
                    <h1 className={styles.title} style={{ fontSize: "x-large" }}>Locations</h1>
                    <div className={styles.locationsContainer}>
                        <Location level={levels[mode].level1} id="level1" revealed={false} cleared={false} className={styles.cardBack} />
                        <Location level={levels[mode].level2} id="level2" revealed={false} cleared={false} className={styles.cardBack} />
                        <Location level={levels[mode].level3} id="level3" revealed={false} cleared={false} className={styles.cardBack} />
                        <Location level={levels[mode].level4} id="level4" revealed={false} cleared={false} className={styles.cardBack} />
                        <Location level={levels[mode].level5} id="level5" revealed={false} cleared={false} className={styles.cardBack} />
                    </div>
                </div><br />

                {/* Players */}
                <div style={tabBackground} className={styles.tabBackground}>
                    <h1 className={styles.title} style={{ fontSize: "x-large" }}>Players</h1>
                    <div className={styles.playersContainer}>
                        <Player name="Xensy" stats={playersStats.Xensy} abilities={playersAbilities.Xensy} />
                        <Player name="Miron" stats={playersStats.Miron} abilities={playersAbilities.Miron} />
                    </div>
                </div><br />

                {/* Enemies */}
                <div style={tabBackground} className={styles.tabBackground}>
                    <h1 className={styles.title} style={{ fontSize: "x-large" }}>Enemies</h1>
                    <div className={styles.playersContainer}>
                        {enemyList.map((enemy, index) => (
                            <Enemy
                                key={index}
                                name={enemy.name}
                                stats={enemy.stats}
                                onRemove={() => {
                                    const newList = [...enemyList];
                                    newList.splice(index, 1);
                                    setEnemyList(newList);
                                }}
                            />
                        ))}

                        {!selectingEnemy ? (
                            <div className={styles.addCard} onClick={() => { setSelectingEnemy(true), setAddEnemySymbol("+") }} onMouseEnter={() => setAddEnemySymbol("Spawn Enemy")} onMouseLeave={() => setAddEnemySymbol("+")} >
                                <span className={styles.plusSign}>{addEnemySymbol}</span>
                            </div>
                        ) : (
                            <div className={styles.selectCard}>
                                <select
                                    className={styles.enemyDropdown}
                                    value={selectedEnemy}
                                    onChange={(e) => setSelectedEnemy(e.target.value)}
                                >
                                    <option value="">Choose enemy...</option>
                                    {enemiesList.map((enemyName) => (
                                        <option key={enemyName} value={enemyName}>
                                            {enemyName}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className={styles.enemyDropdown}
                                    value={selectedEnemyLevel}
                                    onChange={(e) => setSelectedEnemyLevel(e.target.value)}
                                >
                                    <option value="" className={styles.enemyLevel}>Enemy's Level...</option>
                                    <option value="Lv1" className={styles.enemyLevel}>I</option>
                                    <option value="Lv2" className={styles.enemyLevel}>II</option>
                                    <option value="Lv3" className={styles.enemyLevel}>III</option>

                                </select>
                                <button className={styles.confirmButton} onClick={handleConfirmAddEnemy}>
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
}

export default Game;
