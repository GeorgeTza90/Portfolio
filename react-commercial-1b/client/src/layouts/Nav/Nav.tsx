import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import NavImage from "/assets/logo2.png";
import UserImage from "/assets/userImage.png";
import LogOutButton from "../../components/Forms/LogOut";
import NavButton from "../../components/Buttons/NavButton";

const Nav: React.FC = () => {
  const [cookies] = useCookies(["auth_token"]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!cookies.auth_token && cookies.auth_token !== "undefined");
  }, [cookies.auth_token]);

  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

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
          <NavButton to="/" slot="" size={2.1} image="home"/>                              
          <NavButton to="/destination" slot="" size={2.5} image="destination"/>
          <NavButton to="/about" slot="" size={2.3} image="about"/>
          <NavButton to="/contact" slot="" size={2.1} image="contact"/>
        </div>

        <div className={`${styles.navLinks2} ${styles.desktopOnly}`}>
          {!isLoggedIn ? (
            <>
              <NavButton to="/login" slot="" size={2.1} image="login"/>
              <NavButton to="/register" slot="" size={2.1} image="register"/>
            </>
          ) : (
            <>
              <LogOutButton />              
              <img className={styles.UserImage} src={UserImage} alt="Profile" />
            </>
          )}
        </div>
      </nav>

      {/* Μobile */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>        
        <NavButton to="/" slot="" size={2.1} image="home" onClick={() => setSidebarOpen(false)}/>                              
        <NavButton to="/destination" slot="" size={2.5} image="destination" onClick={() => setSidebarOpen(false)}/>
        <NavButton to="/about" slot="" size={2.3} image="about" onClick={() => setSidebarOpen(false)}/>
        <NavButton to="/contact" slot="" size={2.1} image="contact" onClick={() => setSidebarOpen(false)}/>        
        <br /><br />
        {!isLoggedIn ? (
          <>
            <NavButton to="/login" slot="" size={2.2} image="login"/>
            <NavButton to="/register" slot="" size={2.1} image="register"/>
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
