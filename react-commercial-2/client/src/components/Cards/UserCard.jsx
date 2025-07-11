import styles from "./userCard.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DeleteService from "../../services/DeleteService";
import StoreButton from "../../components/Buttons/StoreButton";


function UserCard({ user, avatar, songs }) {
    const [userSongs, setUserSongs] = useState(songs);
    const [hidden, setHidden] = useState(true);
    const [cookies] = useCookies("auth_token");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setUserSongs(songs);
    }, [songs]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleProfileSettings = async () => {
        navigate("/profile");
    };

    const handleDelete = async (song) => {
        if (window.confirm("Are you sure you want to delete this song?")) {
            try {
                const response = await DeleteService.deleteSongData(song);
                console.log("Song deleted successfully:", response.data);
                setUserSongs(prevSongs => prevSongs.filter(s => s.id !== song.id));
                setSuccess(true);
            } catch (err) {
                console.error("Error deleting the song:", err);
                setErrMsg("There was an issue deleting the song. Please try again.");
            }
        }
    };

    const handleUploadButton = () => {
        navigate("/player/upload");
    }

    const handleInfo = () => {
        setHidden(false);
        setTimeout(() => {
            setHidden(true);
        }, 5000);
    };


    return (
        <>
            {success ? (
                <div className={styles.successMessage}>
                    Deleting Track Successfully...
                </div>
            ) : (
                <>
                    <div className={styles.overal}>
                        <div className={styles.bg}>
                            <div className={styles.all}>
                                <label className={styles.Label1}>User Stats</label>
                                <br /><br />
                                <div className={styles.stats1}>
                                    <div className={styles.stats2}>
                                        {user.premium ? (
                                            <>
                                                <div onClick={handleProfileSettings} className={styles.stats3}>
                                                    <label onMouseEnter={handleInfo}>⚙️</label>
                                                    <label className={styles.info}>{!hidden ? "settings" : ""}</label>
                                                </div>
                                                <br />
                                            </>
                                        ) :
                                            <>
                                                <div className={styles.stats3}>
                                                    <label onMouseEnter={handleInfo}>⚙️</label>
                                                    <label className={styles.info2}>{!hidden ? "only for premium users" : ""}</label>
                                                </div>
                                                <br />
                                            </>
                                        }

                                        <label className={styles.labeled}>Username:</label>
                                        <label>{user.username}</label>
                                        <label className={styles.labeled}>Grande Points:</label>
                                        <label>{user.gp}</label>
                                        <label className={styles.labeled}>Songs Uploaded:</label>
                                        <label>{userSongs.length}</label>

                                        <label className={!user.premium ? "" : styles.premium}>
                                            {!user.premium ? "REGULAR USER" : "PREMIUM USER"}
                                        </label>
                                    </div>
                                    <img src={avatar} className={styles.img} />
                                </div>
                                <img src={avatar} className={styles.imgMobile} />
                            </div>

                        </div>
                    </div>
                    <br /><br />


                    <div className={styles.overal}>
                        <div className={styles.bg}>
                            <label className={styles.Label1}>Your Songs</label><br /><br />
                            {userSongs.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr className={styles.labeled}>
                                            <th>Artist</th>
                                            <th>Title</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userSongs.map((song, index) => (
                                            <tr key={index}>
                                                <td>{song.artist}</td>
                                                <td>{song.title}</td>
                                                <td>
                                                    <div className={styles.delete} onClick={() => handleDelete(song)}>❌</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <>
                                    <div className={styles.emptyList}>
                                        <p>No songs uploaded yet!</p>
                                        <StoreButton slot={"Upload song"} onClick={handleUploadButton} fontSize="15px" size="195px" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default UserCard;
