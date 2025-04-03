import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import AboutCard from "../../components/Cards/AboutCard";


function Home() {
  const [heading, setHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getAboutData();
        setHeading(data.heading || "About Grande Player");

      } catch (err) {
        console.error("Error fetching news:", err);
        setHeading("About Grande Player");
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Heading heading={heading} />

      <div className="body">
        <AboutCard />
      </div>
    </>
  );
}

export default Home;
