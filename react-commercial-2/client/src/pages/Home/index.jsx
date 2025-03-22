import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Heading from "../../layouts/Heading/Heading";
import UserCard from "../../components/Cards/UserCard";
import GetService from "../../services/GetService";
import GpsCard from "../../components/Cards/GPSCard";
import GuestCard from "../../components/Cards/GuestCard";


function Home() {
  const [heading, setHeading] = useState("");
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [songs, setSongs] = useState("");
  const [cookies] = useCookies("auth_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getHomeData(cookies.auth_token);
        setUser(data.user);
        setAvatar(data.avatar);
        setSongs(data.songs);
        setHeading(data.heading);

      } catch (err) {
        console.error("Error fetching home:", err);
        setUser("Guest");
        setAvatar(null);
        setSongs(null);
        setHeading(`Welcome Guest`);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Heading heading={heading} />

      <div className="body-1">
        {user.username !== "Guest" && avatar ?
          <UserCard user={user ? user : ""} avatar={avatar ? avatar : ""} songs={songs ? songs : ""} />
          :
          <GuestCard />
        }<br />

        <GpsCard user={user ? user : "Guest"} />
      </div>






    </>
  );
}

export default Home;
