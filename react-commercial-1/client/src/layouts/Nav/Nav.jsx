import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import NavImage from "/assets/logo2.png";
import UserImage from "/assets/userImage.png";
import LogOutButton from "../../components/Forms/LogOut";


function Nav() {
  const [cookies, setCookies, removeCookies] = useCookies(["auth_token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (cookies.auth_token && cookies.auth_token !== "undefined") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setCookies(false);
  }, [cookies.auth_token]);


  return (
    <nav>
      <div className={styles.nav}>
        <div className={styles.navLinks}>
          <img
            className={styles.navImage}
            src={NavImage}
            alt="Company picture"
          />
        </div>

        <div className={styles.navLinks}>
          <Link className={styles.navLink} to="/">News</Link>
          <Link className={styles.navLink} to="/destination">Destination</Link>
          <Link className={styles.navLink} to="/about">About</Link>
          <Link className={styles.navLink} to="/contact">Contact</Link>
        </div>

        <div className={!isLoggedIn ? styles.navLinks2 : styles.offscreen}>
          <Link className={styles.navLink} to="/login">Sign In</Link>
          <Link className={styles.navLink} to="/register">Sign Up</Link>
        </div>

        <div className={isLoggedIn ? styles.navLinks2 : styles.offscreen}>
          <LogOutButton />
          <img className={styles.UserImage} src={UserImage} alt="profile picture" />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
