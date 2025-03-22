import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import PostService from "../../services/PostService";
import styles from "./nav.module.css";


function Nav({ hid = true }) {
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(hid);
    const [cookies, setCookies, removeCookies] = useCookies(["auth_token"]);
    const token = cookies.auth_token;

    const handleNav = () => {
        setHidden((prevHidden) => !prevHidden);
    };

    const handleLogout = async () => {
        try {
            const response = await PostService.postLogoutData(token);
            console.log("Response Data:", response.data);

            removeCookies("auth_token");
            navigate("/login");
        } catch (err) {
            console.error("Logout Error:", err);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    if (hidden === false) {
        setTimeout(() => {
            setHidden(true);
        }, 10000);
    }


    return (
        <>
            <div className={hidden ? styles.hidden : styles.all}>
                <a href="/" className={styles.navButton}>Home</a>
                <a href="/player" className={styles.navButton}>Player</a>
                <label className={styles.label}>The One & Only Smart Audio Player</label>
                <a href="/about" className={styles.navButton}>About</a>
                {!token ? <a href="/login" className={styles.navButton}>Login</a> : <a onClick={handleLogout} className={styles.navButton}>Logout</a>}
            </div>
            <span onClick={handleNav}>
                <nav className={!hidden ? styles.nav : styles.navHidden}>
                    <div className={styles.trademark}><br />
                        &copy;{new Date().getFullYear()} GrandePlayer
                    </div>
                </nav>
            </span>
        </>
    );
}

export default Nav;