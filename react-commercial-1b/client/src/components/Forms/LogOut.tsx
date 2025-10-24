import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PostService from "../../services/PostService";
import styles from "../../layouts/Nav/nav.module.css";

function LogOutButton() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["auth_token"]);
  const token = cookies.auth_token;

  const handleLogout = async () => {
    try {
      const response = await PostService.postLogoutData(token);
      console.log("Response Data:", response.data);

      removeCookie("auth_token", { path: '/' });
      navigate("/login");
    } catch (err) {
      console.error("Logout Error:", err);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <button className={styles.LogOutButton} onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogOutButton;

