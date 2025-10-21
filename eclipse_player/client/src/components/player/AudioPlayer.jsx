import { useEffect, useState } from "react";
import { useAudio } from "../../contexts/AudioContextWeb";
import Circle from "../ui/Circle";
import PlayButton from "../buttons/PlayButton";
import { formatTime } from "../../hooks/useFormatTime";
import styles from "./audioPlayer.module.css";
import { useIsMobile } from "../../hooks/useIsMobile"

export default function AudioPlayer() {
  const {
    currentSong, isPlaying, position, duration, volume, togglePlay,
    stop, next, previous, setVolume, seekTo
  } = useAudio();

  const shadowColor = currentSong?.averageColor ?? "#bebebe";
  const [intensity, setIntensity] = useState(30);
  const isMobile = useIsMobile()

  useEffect(() => {
    setIntensity(volume * 30);
  }, [volume]);

  const sliderStyle = {
    flex: 1,
    WebkitAppearance: "none",
    height: "6px",
    borderRadius: "3px",
    background: `linear-gradient(to right, ${shadowColor}, ${shadowColor} ${position / (duration || 1) * 100}%, #555 ${position / (duration || 1) * 100}%)`,
    outline: "none",
  };

  const volumeSliderStyle = {
    flex: 1,
    WebkitAppearance: "none",
    height: "6px",
    borderRadius: "3px",
    background: `linear-gradient(to right, ${shadowColor}, ${shadowColor} ${volume * 100}%, #555 ${volume * 100}%)`,
    outline: "none",
  };

  return (
    <div className={styles.container}>
      {/* Circle */}
      <Circle size={isMobile ? 400 : 600} top={isMobile ? 120 : 150} intensity={isMobile ? intensity * 0.6 : intensity} heightOffset={8} shadowColor={shadowColor} />
      <Circle size={isMobile ? 250 : 300} top={isMobile ? 550 : 800} intensity={intensity * 0.5} heightOffset={6} shadowColor={shadowColor} color2="#0e0e0eff" color1="#1b1a1aff" />

      {/* Player */}
      <div className={styles.playerContent}>
        {/* Info */}
        <div className={styles.infoRow}>
          {currentSong?.image && <img src={currentSong.image} alt={currentSong.title} className={styles.image} />}
          <div>
            <h3 className={styles.title}>{currentSong?.title || "Song Title"}</h3>
            <p className={styles.artist}>{currentSong?.artist || "Artist Name"}</p>
          </div>
        </div>
        <br />

        {/* Controls */}
        <div className={styles.controls}>
          <PlayButton type="previous" onClick={previous} />
          <PlayButton type="stop" onClick={stop} />
          <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} />
          <PlayButton type="next" onClick={next} />
        </div>
        <br />

        {/* Time Slider */}
        <div className={styles.sliderRow}>
          <span className={styles.time}>{formatTime(position)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="0.1"
            value={position}
            onChange={(e) => seekTo(Number(e.target.value))}
            style={sliderStyle}
          />
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
        <br />

        {/* Volume */}
        <div className={styles.sliderRow}>
          <button className={styles.VolButton} onClick={() => setVolume(0)}>
            <img className={styles.volIcon} src="/assets/icons/volMin2.png" />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={volumeSliderStyle}
          />
          <button className={styles.VolButton} onClick={() => setVolume(1)}>
            <img className={styles.volIcon} src="/assets/icons/volMax2.png" />
          </button>
        </div>
      </div>
    </div>
  );
}

