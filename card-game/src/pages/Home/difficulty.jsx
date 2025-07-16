import { useNavigate } from "react-router-dom";
import DifficultyCard from "../../components/cards/difficultyCard"
import styles from "../../components/cards/cards.module.css"

function Difficulty() {

    const ChooseDifficulty = () => {

    }

    return (
        <>
            <div className={styles.DifContainer}>
                <DifficultyCard slot={"Easy Mode"} onclick={ChooseDifficulty} bgI={"easy"} />
                <DifficultyCard slot={"Normal Mode"} onclick={ChooseDifficulty} bgI={"normal"} />
                <DifficultyCard slot={"Hard Mode"} onclick={ChooseDifficulty} bgI={"hard"} />
                <DifficultyCard slot={"Hell Mode"} onclick={ChooseDifficulty} bgI={"hell"} />
            </div>

        </>
    )
}

export default Difficulty;