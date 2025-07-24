import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Location from "../../components/cards/locationCard.jsx";
import Player from "../../components/cards/playerCard.jsx";
import Enemy from "../../components/cards/enemyCard.jsx";
import styles from "../../components/cards/cards.module.css";
import Players from "../../data/players.json";
import Locations from "../../data/locations.json";
import Enemies from "../../data/enemies.json";
import Encounters from "../../data/encounters.json";
import RemoveButton from "../../components/buttons/RemoveButton.jsx";

function Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const { mode } = location.state || {};
    const { encounterList } = Encounters;
    const { playersStats, playersAbilities } = Players;
    const { levels, locationList, locationStats } = Locations;
    const { enemiesList, enemiesStats, leviathanList, leviathanAbilities } = Enemies;

    const [locationBG, setLocationBG] = useState("Back");

    const [encounterLevel, setEncounterLevel] = useState("I");
    const [currentEncounter, setCurrentEncounter] = useState("");

    const [enemyList, setEnemyList] = useState([]);
    const [selectingEnemy, setSelectingEnemy] = useState(false);
    const [selectedEnemy, setSelectedEnemy] = useState("");
    const [selectedEnemyLevel, setSelectedEnemyLevel] = useState("");
    const [addEnemySymbol, setAddEnemySymbol] = useState("+");

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectingLocation, setSelectingLocation] = useState(null);
    const [tempSelectedLocation, setTempSelectedLocation] = useState("");

    const tabLocationBackground = {
        backgroundImage:
            locationBG === "Back"
                ? "url(/bg3.jpg)"
                : `url(/artworks/${encodeURIComponent(locationBG)}.png)`,
    };

    const tabBackground = { backgroundImage: "url(/bg3.jpg)" };

    const handleConfirmAddEnemy = () => {
        if (!selectedEnemy) return;

        const isLeviathan = leviathanList.includes(selectedEnemy);
        const stats = isLeviathan
            ? enemiesStats[selectedEnemy] || {}
            : enemiesStats[selectedEnemy]?.[selectedEnemyLevel] || {};

        const newEnemy = {
            name: selectedEnemy,
            stats: stats,
            abilities: isLeviathan ? leviathanAbilities[selectedEnemy] || [] : [],
        };

        setEnemyList((prev) => [...prev, newEnemy]);
        setSelectingEnemy(false);
        setSelectedEnemy("");
        setSelectedEnemyLevel("");
    };

    const ToDifficulty = () => {
        navigate("/difficulty");
    };

    const getSelectedLocationName = (levelKey) => {
        const found = selectedLocations.find((loc) => loc.levelKey === levelKey);
        return found ? found.locationName : null;
    };

    const handleRemoveLastLocation = () => {
        setSelectedLocations((prev) => {
            if (prev.length === 0) return prev;

            const newLocations = [...prev];
            newLocations.pop();

            if (newLocations.length === 0) {
                setLocationBG("Back");
                setEncounterLevel("I");
            } else {
                const previousLocationName = newLocations[newLocations.length - 1].locationName;
                const previousLevel = locationStats[previousLocationName]?.level || "I";
                setLocationBG(previousLocationName);
                setEncounterLevel(previousLevel);
            }

            return newLocations;
        });

        setSelectingLocation(null);
    };


    const handleConfirmLocation = (levelKey) => {
        if (!tempSelectedLocation) return;

        setEncounterLevel(locationStats[tempSelectedLocation].level);

        setSelectedLocations((prev) => {
            const filtered = prev.filter((loc) => loc.levelKey !== levelKey);
            return [...filtered, { levelKey, locationName: tempSelectedLocation }];
        });

        setLocationBG(tempSelectedLocation);
        setSelectingLocation(null);
        setTempSelectedLocation("");
    };

    const handleNewEncounter = () => {
        if (!encounterList || !encounterList[encounterLevel]) {
            console.error("No encounters found for this level");
            return;
        }

        const encountersForLevel = encounterList[encounterLevel];
        const keys = Object.keys(encountersForLevel);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const newEncounter = encountersForLevel[randomKey];

        setCurrentEncounter(newEncounter);
    };

    return !location.state ? (
        ToDifficulty()
    ) : (
        <div className={styles.gameContainer}>

            {/* LOCATIONS & ENCOUNTERS*/}
            <div style={tabLocationBackground} className={styles.tabBackground}>
                <h1 className={styles.title} style={{ fontSize: "x-large" }}>
                    Locations
                </h1>
                <div className={styles.locationsContainer}>
                    {(() => {
                        const levelKeys = Object.keys(levels[mode]);
                        const nextSelectableLevelKey = levelKeys.find(
                            (key) => !selectedLocations.some((loc) => loc.levelKey === key)
                        );

                        return levelKeys.map((levelKey, index) => {
                            const locationGroup = levels[mode][levelKey];
                            const isFirst = index === 0;
                            const prevKey = index > 0 ? levelKeys[index - 1] : null;
                            const canReveal = isFirst || (prevKey && selectedLocations.some(loc => loc.levelKey === prevKey));
                            const selectedLoc = getSelectedLocationName(levelKey);

                            return (
                                <div key={levelKey} className={styles.locationSlot}>
                                    {selectingLocation === levelKey ? (
                                        <div className={styles.selectLocation}>
                                            <select
                                                style={{ fontSize: "0.85rem" }}
                                                className={styles.locationDropdown}
                                                value={tempSelectedLocation}
                                                onChange={(e) => setTempSelectedLocation(e.target.value)}
                                            >
                                                <option value="" disabled hidden>
                                                    Choose location...
                                                </option>
                                                {locationList[locationGroup].map((loc) => (
                                                    <option key={loc} value={loc}>
                                                        {loc}
                                                    </option>
                                                ))}
                                            </select>

                                            {levelKey === nextSelectableLevelKey && (
                                                <>
                                                    <button
                                                        style={{ fontSize: "0.85rem" }}
                                                        className={styles.confirmButton}
                                                        onClick={() => handleConfirmLocation(levelKey)}
                                                    >
                                                        Confirm
                                                    </button>
                                                </>
                                            )}

                                            {selectedLocations.length > 0 &&
                                                selectedLocations[selectedLocations.length - 1].levelKey === levelKey && (
                                                    <RemoveButton
                                                        onClick={handleRemoveLastLocation}
                                                        slot="X"
                                                        alt="X"
                                                        fontSize="0.8rem"
                                                        width="150px"
                                                        backgroundColorHovered="rgba(0, 0, 0, 0.61)"
                                                    />
                                                )}
                                        </div>
                                    ) : (
                                        <Location
                                            level={locationGroup}
                                            id={levelKey}
                                            name={!selectedLoc ? "Back" : selectedLoc}
                                            revealed={!!selectedLoc}
                                            cleared={false}
                                            stats={locationStats[selectedLoc] || ""}
                                            onReveal={() => {
                                                if (canReveal) {
                                                    setSelectingLocation(levelKey);
                                                    setTempSelectedLocation(selectedLoc || "");
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        });
                    })()}
                </div>

                <h1 className={styles.title} style={{ fontSize: "x-large" }}>
                    Encounter
                </h1>
                <div className={styles.encounterCard}>
                    <div>
                        {currentEncounter ? "Type: " + currentEncounter.type : "Generate"}
                        <button
                            style={{
                                fontSize: "1rem",
                                backgroundColor: "grey",
                                padding: "0.4rem 0.8rem",
                                margin: "0.8rem",
                            }}
                            onClick={handleNewEncounter}
                        >
                            ♻️
                        </button>
                    </div>
                    <div className={styles.encounterText}>{currentEncounter ? currentEncounter.text : "No Encounters Yet"}</div>
                </div>
            </div><br />


            {/* PLAYERS */}
            <div style={tabBackground} className={styles.tabBackground}>
                <h1 className={styles.title} style={{ fontSize: "x-large" }}>
                    Players
                </h1>
                <div className={styles.playersContainer}>
                    <Player name="Xensy" stats={playersStats.Xensy} abilities={playersAbilities.Xensy} />
                    <Player name="Miron" stats={playersStats.Miron} abilities={playersAbilities.Miron} />
                </div>
            </div><br />

            {/* ENEMIES */}
            <div style={tabBackground} className={styles.tabBackground}>
                <h1 className={styles.title} style={{ fontSize: "x-large" }}>
                    Enemies
                </h1>
                <div className={styles.playersContainer}>
                    {enemyList.map((enemy, index) => {
                        const isLeviathan = leviathanList.includes(enemy.name);
                        return (
                            <Enemy
                                key={index}
                                name={enemy.name}
                                stats={enemy.stats}
                                abilities={isLeviathan ? leviathanAbilities[enemy.name] || [] : []}
                                type={isLeviathan ? "Leviathan" : "Enemy"}
                                onRemove={() => {
                                    const newList = [...enemyList];
                                    newList.splice(index, 1);
                                    setEnemyList(newList);
                                }}
                            />
                        );
                    })}

                    {!selectingEnemy ? (
                        <div
                            className={styles.addCard}
                            onClick={() => {
                                setSelectingEnemy(true);
                                setAddEnemySymbol("+");
                            }}
                            onMouseEnter={() => setAddEnemySymbol("Spawn Enemy")}
                            onMouseLeave={() => setAddEnemySymbol("+")}
                        >
                            <span className={styles.plusSign}>{addEnemySymbol}</span>
                        </div>
                    ) : (
                        <div className={styles.selectCard}>
                            <select
                                className={styles.enemyDropdown}
                                value={selectedEnemy}
                                onChange={(e) => setSelectedEnemy(e.target.value)}
                            >
                                <option value="" disabled hidden>
                                    Choose enemy...
                                </option>
                                {enemiesList.map((enemyName) => (
                                    <option key={enemyName} value={enemyName}>
                                        {enemyName}
                                    </option>
                                ))}
                            </select>

                            {!leviathanList.includes(selectedEnemy) && (
                                <select
                                    className={styles.enemyDropdown}
                                    value={selectedEnemyLevel}
                                    onChange={(e) => setSelectedEnemyLevel(e.target.value)}
                                >
                                    <option value="" disabled hidden>
                                        Enemy's Level...
                                    </option>
                                    <option value="Lv1">I</option>
                                    <option value="Lv2">II</option>
                                    <option value="Lv3">III</option>
                                </select>
                            )}

                            {(
                                (leviathanList.includes(selectedEnemy)) ||
                                (selectedEnemy && !leviathanList.includes(selectedEnemy) && selectedEnemyLevel)
                            ) && (
                                    <button className={styles.confirmButton} onClick={handleConfirmAddEnemy}>
                                        Add
                                    </button>
                                )}
                            <RemoveButton slot="X" onClick={() => setSelectingEnemy(false)} />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Game;

