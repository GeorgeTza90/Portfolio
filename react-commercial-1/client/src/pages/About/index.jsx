import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import styles from "../../components/Cards/DestCard.module.css";
import LogoImg from "../../assets/logo2.png";

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
        <div className={styles.all}>
          <div className={styles.card2}>
            <div className={styles.textDiv}>
              <img src={LogoImg} className={styles.logo} alt="IceCream Vacations" >
              </img>
              <div className={styles.textPAbout}>
                Welcome to IceCream Vacations, the premier travel agency for interplanetary adventures! Explore the wonders of the solar system with our exclusive vacation packages to imaginary cities built on the most breathtaking planets and moons. Stroll through New Olympus on Mars, where domed skylines glow under crimson sunsets, or dive beneath the icy crust of Europa to visit Aquatropolis, the first underwater city suspended in its vast alien ocean. Experience the neon-lit methane canals of Titan Harbor, or relax in Cloudspire, a floating resort above the golden storms of Venus. For thrill-seekers, Stormhaven on Jupiter's moon Callisto offers breathtaking views of Jupiter’s swirling storms with low-radiation luxury pods. Whether you're looking for adventure, serenity, or the ultimate space-age getaway, Cosmic Getaways turns science fiction into reality—one planet at a time!
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default About;
