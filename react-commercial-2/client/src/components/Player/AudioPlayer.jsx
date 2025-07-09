import React, { useRef, useState, useEffect } from "react";
import styles from "./audioPlayer.module.css";
import Visualizer from "../Visualizer/Visualizer";
import Playlist from "../Playlist/Playlist";
import useFormatTime from "../../hooks/useFormatTime";

function AudioPlayer({ songs, user }) {
    if (!songs || songs.length === 0) { return <p>loading Track</p> }

    const [isPlaying, setIsPlaying] = useState(false);
    const [analyser, setAnalyser] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hidden, setHidden] = useState(true);
    const [trackID, setTrackID] = useState(0);
    const [instrVolumes, setInstrVolumes] = useState([0.7, 0.7, 0.7, 0.7, 0.7])
    const currentSong = songs[trackID];
    const imgSrc = currentSong.urls.img_url;
    const instrSrc = [1, 2, 3, 4, 5].map(i => currentSong.urls[`inst${i}_url`] || null);
    const [instrAudioContext, setInstrAudioContext] = useState(Array(5).fill(null));
    const instrRefs = instrSrc.map((src) => useRef(src));

    useEffect(() => {
        const audio = instrRefs[0].current;
        instrRefs.map((ref, index) => {
            if (ref.current) ref.current.volume = instrVolumes[index];
        })
        if (audio) {
            audio.addEventListener("timeupdate", updateProgressBar);
            audio.addEventListener("loadedmetadata", updateProgressBar);
            audio.addEventListener("ended", () => {
                setTrackID(trackID + 1);
            });
            return () => {
                audio.removeEventListener("timeupdate", updateProgressBar);
                audio.removeEventListener("loadedmetadata", updateProgressBar);
                audio.removeEventListener("ended", () => { });
            };
        }
    }, [instrVolumes]);

    const handlePlayPause = async () => {
        try {
            if (!instrAudioContext[0] && !instrAudioContext[1] && !instrAudioContext[2] && !instrAudioContext[3] && !instrAudioContext[4]) {
                const context = new (window.AudioContext || window.webkitAudioContext)();
                const analyserNode = context.createAnalyser();
                analyserNode.fftSize = 256;
                analyserNode.smoothingTimeConstant = 0.9;

                setInstrAudioContext([
                    instrSrc.map((src) => {
                        src ? context : null
                    })
                ]);
                setAnalyser(analyserNode);

                instrSrc.map((src, i) => {
                    src ? context.createMediaElementSource(instrRefs[i].current).connect(analyserNode) : null;
                });

                analyserNode.connect(context.destination);
            }

            if (isPlaying) {
                instrSrc.map((src, i) => {
                    if (src) instrRefs[i].current.pause();
                });
            } else {
                instrSrc.map((src, i) => {
                    if (src) instrRefs[i].current.play();
                });
            }
            setIsPlaying(!isPlaying)
        } catch (error) {
            console.error('Error during play/pause', error);
        }
    };

    const handleStop = () => {
        instrSrc.map((src, i) => {
            if (src) instrRefs[i].current.pause();
        });
        instrSrc.map((src, i) => {
            if (src) instrRefs[i].current.currentTime = 0;
        });
        setCurrentTime(0);
        setProgress(0);
        setIsPlaying(false);
    };

    const handlePrevious = () => {
        if (trackID > 0) {
            setTrackID(trackID - 1);
        }
        setIsPlaying(false);
        handleResetVolumes();
        handleStop();
    }

    const handleNext = () => {
        if (trackID < songs.length - 1) {
            setTrackID(trackID + 1);
        }
        setIsPlaying(false);
        handleResetVolumes();
        handleStop();
    }

    const updateProgressBar = () => {
        const audio = instrRefs[0].current;
        if (audio) {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        }
    };

    const handleSeek = (e) => {
        const newTime = (e.target.value / 100) * instrRefs[0].current.duration;
        instrSrc.map((src, i) => {
            if (src) instrRefs[i].current.currentTime = newTime;
        });
        setProgress(e.target.value)
    };

    const handleInstrVolumes = (index, newVolume) => {
        setInstrVolumes(prevVolumes => {
            const newVolumes = [...prevVolumes];
            newVolumes[index] = newVolume;
            return newVolumes;
        });
    };

    const handleResetVolumes = () => {
        setInstrVolumes([0.7, 0.7, 0.7, 0.7, 0.7]);
    };

    const handleInfo = () => {
        setHidden(false);
        setTimeout(() => {
            setHidden(true)
        }, 5000)
    };

    const handleSelectTrack = (id) => {
        setTrackID(id);
        handleResetVolumes();
        handlePlayPause();
    }

    return (
        <div className={styles.bg}>
            <div className={styles.all}><br />
                <label className={styles.name}>{currentSong.artist} - {currentSong.title}</label><br /><br />

                {instrSrc.map((src, i) => src ?
                    <audio
                        key={i}
                        ref={instrRefs[i]}
                        src={src}
                        crossOrigin="anonymous"
                    />
                    : null)}


                {/* Desktop */}
                <div className={styles.vol}>
                    <div className={styles.buttonDiv}>
                        <button onClick={handlePrevious} className={trackID > 0 ? styles.playButton : styles.playButtonInactive}>
                            {'◀◀'}
                        </button>
                        <button onClick={handleStop} className={styles.playButton}>
                            {'■'}
                        </button>
                        <button onClick={handlePlayPause} className={styles.playButton}>
                            {isPlaying ? "⏸" : "▶"}
                        </button>
                        <button onClick={handleNext} className={trackID < songs.length - 1 ? styles.playButton : styles.playButtonInactive}>
                            {'▶▶'}
                        </button>
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleSeek}
                        style={{ width: "200px" }}
                        className={styles.progressBar}
                    />

                    <span className={styles.time}>{useFormatTime(currentTime, instrRefs[0])}</span>
                </div>

                {/* Mobile */}
                <div className={styles.volMobile}>
                    <br />
                    <div className={styles.buttonDiv}>
                        <button onClick={handlePrevious} className={trackID > 0 ? styles.playButton : styles.playButtonInactive}>
                            {'◀◀'}
                        </button>
                        <button onClick={handleStop} className={styles.playButton}>
                            {'■'}
                        </button>
                        <button onClick={handlePlayPause} className={styles.playButton}>
                            {isPlaying ? "⏸" : "▶"}
                        </button>
                        <button onClick={handleNext} className={trackID < songs.length - 1 ? styles.playButton : styles.playButtonInactive}>
                            {'▶▶'}
                        </button>
                    </div><br />

                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleSeek}
                        style={{ width: "400px", height: "5px" }}
                        className={styles.progressBar}
                    />

                    <span className={styles.time}>{useFormatTime(currentTime, instrRefs[0])}</span>
                </div><br /><br /><br />

                <div className={styles.song}>
                    <label onMouseEnter={handleInfo} className={styles.info}>ℹ️</label>
                    <label className={styles.info}>{!hidden ? " Adjust instruments' volume as you like" : ""}</label><br /><br />

                    <div className={styles.col}>
                        <div className={styles.instr}>
                            {instrSrc.map((src, i) => src ?
                                <React.Fragment key={`instrument-${i}`}>
                                    <label key={i}>{currentSong.instruments[`inst${i + 1}`] || null}</label><br />
                                </React.Fragment>
                                : null)}
                        </div>

                        <div className={styles.Volumes}>
                            {instrSrc.map((src, i) => src ?
                                <React.Fragment key={`slider-${i}`}>
                                    <input
                                        key={i}
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={instrVolumes[i]}
                                        onChange={(e) => handleInstrVolumes(i, e.target.value)}
                                        className="volume-slider"
                                    /><br />
                                </React.Fragment>
                                : null)}
                        </div>

                        <div className={styles.AudioVisualizer}>
                            {instrAudioContext[0] && analyser && <Visualizer analyser={analyser} />}
                        </div>

                        <img src={imgSrc} className={styles.img} />
                    </div>
                    <button onClick={handleResetVolumes} className={styles.resetVolButton}>
                        Reset Volumes
                    </button>
                </div><br />
                <Playlist songs={songs} user={user} onSelectTrack={handleSelectTrack} />
            </div >
        </div >
    );
}

export default AudioPlayer;