import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import AboutCard from "../../components/Cards/AboutCard";


function About() {
  const [heading, setHeading] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getAboutData();
        setHeading(data.heading);
      } catch (err) {
        setError("Failed to load data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <>
      <Heading heading={heading} />

      <div className="body">
        <AboutCard />
      </div>
    </>
  );
}

export default About;
