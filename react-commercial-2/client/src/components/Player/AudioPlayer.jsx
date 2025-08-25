import { useRef, useState, useEffect } from "react";
import styles from "./audioPlayer.module.css";
import Visualizer from "../Visualizer/Visualizer";
import Playlist from "../Playlist/Playlist";
import useFormatTime from "../../hooks/useFormatTime";

function AudioPlayer({ songs, user }) {
    if (!songs || songs.length === 0) return <p>loading Track</p>;

    const [isPlaying, setIsPlaying] = useState(false);
    const [analyser, setAnalyser] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [hidden, setHidden] = useState(true);
    const [trackID, setTrackID] = useState(0);
    const defaultVolumes = [0.7, 0.7, 0.7, 0.7, 0.7];
    const [instrVolumes, setInstrVolumes] = useState(defaultVolumes);
    const currentSong = songs[trackID];
    const imgSrc = currentSong.urls.img_url;
    const instrSrc = [1, 2, 3, 4, 5].map(i => currentSong.urls[`inst${i}_url`] || null);
    const [instrAudioContext, setInstrAudioContext] = useState(Array(5).fill(null));
    const instrRefs = instrSrc.map(src => useRef(src));

    useEffect(() => {
        instrRefs.forEach((ref, index) => {
            if (ref.current) ref.current.volume = instrVolumes[index];
        });

        const audio = instrRefs[0].current;
        if (!audio) return;

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };

        const onEnded = () => setTrackID(id => Math.min(id + 1, songs.length - 1));

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onTimeUpdate);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onTimeUpdate);
            audio.removeEventListener("ended", onEnded);
        };
    }, [instrVolumes, instrRefs, songs.length]);

    const handlePlayPause = () => {
        if (instrAudioContext.every(ctx => ctx === null)) {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const analyserNode = context.createAnalyser();
            analyserNode.fftSize = 256;
            analyserNode.smoothingTimeConstant = 0.9;

            setInstrAudioContext(instrSrc.map(src => (src ? context : null)));
            setAnalyser(analyserNode);

            instrSrc.forEach((src, i) => {
                if (src) context.createMediaElementSource(instrRefs[i].current).connect(analyserNode);
            });

            analyserNode.connect(context.destination);
        }

        instrRefs.forEach((ref, i) => {
            if (instrSrc[i]) (isPlaying ? ref.current.pause() : ref.current.play());
        });

        setIsPlaying(prev => !prev);
    };

    const handleStop = () => {
        instrRefs.forEach((ref, i) => {
            if (instrSrc[i]) {
                ref.current.pause();
                ref.current.currentTime = 0;
            }
        });
        setCurrentTime(0);
        setProgress(0);
        setIsPlaying(false);
    };

    const handlePrevious = () => {
        setTrackID(id => Math.max(id - 1, 0));
        handleResetVolumes();
        handleStop();
    };

    const handleNext = () => {
        setTrackID(id => Math.min(id + 1, songs.length - 1));
        handleResetVolumes();
        handleStop();
    };

    const handleSeek = e => {
        const newTime = (e.target.value / 100) * instrRefs[0].current.duration;
        instrRefs.forEach((ref, i) => {
            if (instrSrc[i]) ref.current.currentTime = newTime;
        });
        setProgress(e.target.value);
    };

    const handleInstrVolumes = (index, newVolume) => {
        setInstrVolumes(prev => {
            const next = [...prev];
            next[index] = newVolume;
            return next;
        });
    };

    const handleResetVolumes = () => setInstrVolumes(defaultVolumes);

    const handleInfo = () => {
        setHidden(false);
        setTimeout(() => setHidden(true), 5000);
    };

    const handleSelectTrack = id => {
        setTrackID(id);
        handleResetVolumes();
        handlePlayPause();
    };

    return (
        <div className={styles.bg}>
            <div className={styles.all}>
                <br />
                <label className={styles.name}>{currentSong.artist} - {currentSong.title}</label><br /><br />

                {instrSrc.map((src, i) =>
                    src && <audio key={i} ref={instrRefs[i]} src={src} crossOrigin="anonymous" />
                )}

                {/* Desktop */}
                <div className={styles.vol}>
                    <div className={styles.buttonDiv}>
                        <button onClick={handlePrevious} className={trackID > 0 ? styles.playButton : styles.playButtonInactive}>◀◀</button>
                        <button onClick={handleStop} className={styles.playButton}>■</button>
                        <button onClick={handlePlayPause} className={styles.playButton}>{isPlaying ? "⏸" : "▶"}</button>
                        <button onClick={handleNext} className={trackID < songs.length - 1 ? styles.playButton : styles.playButtonInactive}>▶▶</button>
                    </div>
                    <input type="range" min="0" max="100" step="0.1" value={progress} onChange={handleSeek} style={{ width: "200px" }} className={styles.progressBar} />
                    <span className={styles.time}>{useFormatTime(currentTime, instrRefs[0])}</span>
                </div>

                {/* Mobile */}
                <div className={styles.volMobile}>
                    <img src={imgSrc} className={styles.imgMobile} /><br />
                    <div className={styles.buttonDiv}>
                        <button onClick={handlePrevious} className={trackID > 0 ? styles.playButton : styles.playButtonInactive}>◀◀</button>
                        <button onClick={handleStop} className={styles.playButton}>■</button>
                        <button onClick={handlePlayPause} className={styles.playButton}>{isPlaying ? "⏸" : "▶"}</button>
                        <button onClick={handleNext} className={trackID < songs.length - 1 ? styles.playButton : styles.playButtonInactive}>▶▶</button>
                    </div><br />
                    <input type="range" min="0" max="100" step="0.1" value={progress} onChange={handleSeek} style={{ width: "15rem", height: "5px" }} className={styles.progressBar} />
                    <span className={styles.time}>{useFormatTime(currentTime, instrRefs[0])}</span><br />
                </div><br />

                <div className={styles.song}>
                    <label onMouseEnter={handleInfo} className={styles.info}>ℹ️</label>
                    <label className={styles.info}>{!hidden ? " Adjust instruments' volume as you like" : ""}</label><br /><br />
                    <div className={styles.col}>
                        <div className={styles.instr}>
                            {instrSrc.map((src, i) => src && (<div key={i}><label>{currentSong.instruments[`inst${i + 1}`]}</label><br /></div>))}
                        </div>
                        <div className={styles.Volumes}>
                            {instrSrc.map((src, i) => src && <input key={i} type="range" min="0" max="1" step="0.01" value={instrVolumes[i]} onChange={e => handleInstrVolumes(i, e.target.value)} className="volume-slider" />)}
                        </div>
                        <div className={styles.AudioVisualizer}>
                            {instrAudioContext[0] && analyser && <Visualizer analyser={analyser} />}
                        </div>
                        <img src={imgSrc} className={styles.img} />
                    </div>
                    <button onClick={handleResetVolumes} className={styles.resetVolButton}>Reset Volumes</button>
                </div><br />

                <Playlist songs={songs} user={user} onSelectTrack={handleSelectTrack} />
            </div>
        </div>
    );
}

export default AudioPlayer;
