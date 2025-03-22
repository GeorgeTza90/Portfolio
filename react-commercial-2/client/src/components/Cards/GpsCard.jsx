import styles from "./gpsCard.module.css";
import StoreButton from "../../components/Buttons/StoreButton";
import { useNavigate } from "react-router-dom";


function GpsCard({ user }) {
    const navigate = useNavigate();

    const handleStoreButton = () => {
        navigate("/store");
    }


    return (
        <>
            <div className={styles.all}>
                <img src="src/assets/GPS.png" className={styles.img} />

                <div className={styles.main}>
                    <ul>
                        <li>{`Every New Account gets 3 GP (GrandePoints).`}</li>
                        <li>{`Aquire more GP by uploading songs or by purchasing GP at GP-Store.`}</li>
                        <li>{`When uploading a song the first instrument is always free.`}</li>
                        <li>{`For every additional instrument you have to spent 1 GP.`}</li>
                        <li>{`When uploading a song you gain 1 GP.`}</li>
                        <li>{`When you purchase a Premium Account Perk you gain 50 GP for Free.`}</li>
                    </ul>
                </div><br />

                {user !== "Guest" ? <StoreButton slot="Go To Store" onClick={handleStoreButton} /> : ""}
            </div>
        </>
    )
}

export default GpsCard;