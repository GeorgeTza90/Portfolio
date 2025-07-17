import { useLocation } from "react-router-dom";
import { useState } from "react"
import Location from "../../components/cards/locationCard"
import Player from "../../components/cards/playerCard"
import styles from "../../components/cards/cards.module.css"
import GameStats from "../../data/stats.json";

function Game() {
    const location = useLocation();
    const [locationBG, setLocationBG] = useState("");
    const { mode } = location.state || {};
    const { levels, playersStats, playersAbilities } = GameStats;


    const tabBackground = {
        backgroundImage: locationBG === "" ? "url(/bg2.jpg)" : `url(/${locationBG}.jpg)`,
    }

    return (
        <>
            <div className={styles.gameContainer}>
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

                <div style={tabBackground} className={styles.tabBackground}>
                    <h1 className={styles.title} style={{ fontSize: "x-large" }}>Players</h1>
                    <div className={styles.playersContainer}>
                        <Player name="Xensy" stats={playersStats.Xensy} abilities={playersAbilities.Xensy} />
                        <Player name="Miron" stats={playersStats.Miron} abilities={playersAbilities.Miron} />
                    </div>
                </div>
            </div>
        </>

    );
}

export default Game;