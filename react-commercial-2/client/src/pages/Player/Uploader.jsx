import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import UploadForm from "../../components/Forms/UploadForm"


function Uploader() {
  const [heading, setHeading] = useState("");
  const [user, setUser] = useState("");
  const [cookies] = useCookies("auth_token");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getUploaderData(cookies.auth_token);
        setHeading(data.heading);
        setUser(data.user);
        setSongs(data.songs);

      } catch (err) {
        console.error("Error fetching news:", err);
        setHeading("Upload a song and win GP");
        setUser("Guest");
        setSongs([]);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Heading heading={heading} /><br />

      <div className="body">
        <UploadForm user={user} />
      </div>
    </>
  );
}

export default Uploader;
