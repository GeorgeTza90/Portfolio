import styles from "./userCard.module.css"
import StoreButton from "../Buttons/StoreButton"
import { useNavigate } from "react-router-dom";

function UserCard() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/register");
    }

    return (
        <>
            <div className={styles.overal}>
                <div className={styles.bg}>
                    <div className={styles.all}>
                        <label className={styles.Label1}>
                            User Stats
                        </label><br /><br /><br />

                        <div className={styles.stats1} >
                            <div className={styles.stats2}>
                                <label className={styles.labeled} > Username: </label>
                                <label>Guest</label>
                                <label className={styles.labeled} > Grande Points: </label>
                                <label> ??? </label>
                                <label className={styles.labeled} > Songs Uploaded: </label>
                                <label>???</label>

                                <label className={styles.premium} >"PREMIUM USER"</label>
                            </div>
                            <img src="/avatars/guest.png" className={styles.img} />
                        </div>
                    </div >
                </div>
            </div><br /><br />

            <div className={styles.overal}>
                <div className={styles.bg}>
                    <StoreButton slot={"Sign Up Now"} onClick={handleSignUp} />
                </div>
            </div>
        </>
    );
};

export default UserCard;