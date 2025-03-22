import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import RegForm from "../../components/Forms/RegForm"


function Home() {
  const [heading, setHeading] = useState("");
  const [avatars, setAvatars] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getRegisterData();
        setHeading(data.heading || "Sign Up");
        setAvatars(data.avatars)

      } catch (err) {
        console.error("Error on Register:", err);
        setHeading("Sign Up");
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Heading heading={heading} />

      <div className="body">
        <RegForm avatars={avatars} />
      </div>
    </>
  );
}

export default Home;
