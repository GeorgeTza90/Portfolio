import styles from "./about.module.css";

function AboutCard() {

    return (
        <>
            <div className={styles.all}>
                <div className={styles.main}>
                    <div className={styles.main}>
                        We believe music should be more than just background noise, it should be an interactive experience. Frustrated by the limitations of standard players, we set out to create something revolutionary: a music player that puts you in control of every layer of sound.
                    </div>
                </div><br />

                <div className={styles.main}>
                    <ul className={styles.sub1}>
                        <div className={styles.icon}>
                            🎵
                        </div>
                        Multitrack Playback – Each song, each track, every detail. Play and control multiple instrument layers independently, just like in a professional studio.<br /><br />
                        <div className={styles.icon}>
                            🎚
                        </div>
                        Seamless Volume Control – Fine-tune your sound with individual track sliders. Adjust vocals, boost the bass, or isolate instruments with precision.<br /><br />
                        <div className={styles.icon}>
                            ✨
                        </div>
                        Sleek & Intuitive – Designed for smooth navigation and a visually stunning interface, our player makes music interaction effortless and immersive.<br /><br />
                    </ul><br />
                </div>

                <div className={styles.main}>
                    <div className={styles.sub2}>
                        Our mission?
                        To give artists, producers, and casual listeners the power to rediscover music in a whole new way. <br />
                        This isn’t just a player—it’s a sonic playground.<br /><br />
                        Welcome to music, your way.<br /><br />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutCard;