import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Heading from "../../layouts/Heading/Heading";
import AudioPlayer from "../../components/Player/AudioPlayer";
import StoreButton from "../../components/Buttons/StoreButton";
import GetService from "../../services/GetService";


function Player() {
  const [heading, setHeading] = useState("");
  const [user, setUser] = useState("");
  const [cookies] = useCookies("auth_token");
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getPlayerData(cookies.auth_token);
        setHeading(data.heading);
        setUser(data.user);
        setSongs(data.songs);
      } catch (err) {
        console.error("Error fetching player:", err);
        setHeading("Player");
        setUser("Guest");
        setSongs([]);
      }
    };

    fetchData();
  }, []);

  const handleUploadButton = () => {
    navigate("/player/upload");
  }

  const handleStoreButton = () => {
    navigate("/store");
  }

  const handleLoginButton = () => {
    navigate("/login");
  }

  console.log(songs);

  return (
    <>
      <Heading heading={heading} /><br />

      <div className="body">
        <AudioPlayer songs={songs} user={user} /><br />
        {user === "Guest" ? (
          <>
            <p>{user.username} Sign In to upload songs :</p>
            <StoreButton slot={"Sign In"} onClick={handleLoginButton} fontSize="medium" size="200px" /><br /><br />
          </>
        ) : (
          <>
            <p>{user.username} press here to upload your song:</p>
            <StoreButton slot={"Upload your song"} onClick={handleUploadButton} fontSize="15px" size="240px" /><br /><br />
            <p>Get more GP:</p>
            <StoreButton slot={"Go To Store"} onClick={handleStoreButton} fontSize="medium" size="200px" />
          </>
        )}
      </div>
    </>
  );
}

export default Player;
