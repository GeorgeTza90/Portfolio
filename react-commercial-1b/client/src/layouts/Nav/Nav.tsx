import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import NavImage from "/assets/logo2.png";
import UserImage from "/assets/userImage.png";
import LogOutButton from "../../components/Forms/LogOut";

const Nav: React.FC = () => {
  const [cookies] = useCookies(["auth_token"]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!cookies.auth_token && cookies.auth_token !== "undefined");
  }, [cookies.auth_token]);

  // Κλείσιμο sidebar όταν κάνουμε κλικ στο overlay
  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  // Toggle sidebar όταν πατάμε το logo
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navLogo} onClick={toggleSidebar}>
          <img className={styles.navImage} src={NavImage} alt="Company logo" />
        </div>

        {/* Desktop */}
        <div className={`${styles.navLinks} ${styles.desktopOnly}`}>
          <Link className={styles.navLink} to="/">News</Link>
          <Link className={styles.navLink} to="/destination">Destination</Link>
          <Link className={styles.navLink} to="/about">About</Link>
          <Link className={styles.navLink} to="/contact">Contact</Link>
        </div>

        {!isLoggedIn ? (
          <div className={`${styles.navLinks2} ${styles.desktopOnly}`}>
            <Link className={styles.navLink} to="/login">Sign In</Link>
            <Link className={styles.navLink} to="/register">Sign Up</Link>
          </div>
        ) : (
          <div className={`${styles.navLinks2} ${styles.desktopOnly}`}>
            <LogOutButton />
            <img className={styles.UserImage} src={UserImage} alt="Profile" />
          </div>
        )}
      </nav>

      {/* Μobile */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <Link className={styles.navLink} to="/" onClick={() => setSidebarOpen(false)}>News</Link>
        <Link className={styles.navLink} to="/destination" onClick={() => setSidebarOpen(false)}>Destination</Link>
        <Link className={styles.navLink} to="/about" onClick={() => setSidebarOpen(false)}>About</Link>
        <Link className={styles.navLink} to="/contact" onClick={() => setSidebarOpen(false)}>Contact</Link>
        
        {!isLoggedIn ? (
          <>
            <Link className={styles.navLink} to="/login" onClick={() => setSidebarOpen(false)}>Sign In</Link>
            <Link className={styles.navLink} to="/register" onClick={() => setSidebarOpen(false)}>Sign Up</Link>
          </>
        ) : (
          <>
            <LogOutButton />
            <img className={styles.UserImage} src={UserImage} alt="Profile" />
          </>
        )}
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className={styles.overlay} onClick={handleOverlayClick}></div>}
    </>
  );
};

export default Nav;
