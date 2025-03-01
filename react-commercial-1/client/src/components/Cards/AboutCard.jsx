import styles from "./DestCard.module.css";
import LogoImg from "../../assets/logo2.png";


function AboutCard() {
    return (
        <>
            <div className={styles.all}>
                <div className={styles.card2}>
                    <div className={styles.textDiv}>
                        <img src={LogoImg} className={styles.logo} alt="IceCream Vacations" >
                        </img>
                        <div className={styles.textPAbout}>
                            <p>
                                Welcome to IceCream Vacations, the premier travel agency for interplanetary adventures! Explore the wonders of the solar system with our exclusive vacation packages to imaginary cities built on the most breathtaking planets and moons.
                            </p>
                            <p>
                                Stroll through New Olympus on Mars, where domed skylines glow under crimson sunsets, or dive beneath the icy crust of Europa to visit Aquatropolis, the first underwater city suspended in its vast alien ocean. Experience the neon-lit methane canals of Titan Harbor, or relax in Cloudspire, a floating resort above the golden storms of Venus. For thrill-seekers, Stormhaven on Jupiter's moon Callisto offers breathtaking views of Jupiter’s swirling storms with low-radiation luxury pods.
                            </p>
                            <p>
                                Whether you're looking for adventure, serenity, or thes ultimate space-age getaway, Cosmic Getaways turns science fiction into reality—one planet at a time!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutCard;
