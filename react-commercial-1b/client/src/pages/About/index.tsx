import { useEffect, useState } from "react";
import GetService from "../../services/GetService.ts";
import Heading from "../../layouts/Heading/Heading.tsx";
import AboutCard from "../../components/Cards/AboutCard.tsx";


function About() {
  const [heading, setHeading] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
