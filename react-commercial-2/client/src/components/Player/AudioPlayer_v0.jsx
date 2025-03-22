import { useRef, useState, useEffect } from "react";
import styles from "./audioPlayer.module.css";
import Visualizer from "../Visualizer/Visualizer";
import Playlist from "../Playlist/Playlist";

function AudioPlayer({ songs, user }) {
    if (!songs || songs.length === 0) {
        return <p>loading Track</p>
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [analyser, setAnalyser] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hidden, setHidden] = useState(true);
    const [trackID, setTrackID] = useState(0);

    const currentSong = songs[trackID];

    const instr1Src = currentSong.urls.inst1_url ? currentSong.urls.inst1_url : null;
    const instr2Src = currentSong.urls.inst2_url ? currentSong.urls.inst2_url : null;
    const instr3Src = currentSong.urls.inst3_url ? currentSong.urls.inst3_url : null;
    const instr4Src = currentSong.urls.inst4_url ? currentSong.urls.inst4_url : null;
    const instr5Src = currentSong.urls.inst5_url ? currentSong.urls.inst5_url : null;
    const imgSrc = currentSong.urls.img_url;

    const instr1Ref = useRef(instr1Src);
    const instr2Ref = useRef(instr2Src);
    const instr3Ref = useRef(instr3Src);
    const instr4Ref = useRef(instr4Src);
    const instr5Ref = useRef(instr5Src);

    const [instr1AudioContext, setInstr1AudioContext] = useState(null);
    const [instr2AudioContext, setInstr2AudioContext] = useState(null);
    const [instr3AudioContext, setInstr3AudioContext] = useState(null);
    const [instr4AudioContext, setInstr4AudioContext] = useState(null);
    const [instr5AudioContext, setInstr5AudioContext] = useState(null);

    const [instr1Volume, setInstr1Volume] = useState(0.7);
    const [instr2Volume, setInstr2Volume] = useState(0.7);
    const [instr3Volume, setInstr3Volume] = useState(0.7);
    const [instr4Volume, setInstr4Volume] = useState(0.7);
    const [instr5Volume, setInstr5Volume] = useState(0.7);


    const handlePlayPause = async () => {
        try {
            if (!instr1AudioContext && !instr2AudioContext && !instr3AudioContext && !instr4AudioContext && !instr5AudioContext) {
                const context = new (window.AudioContext || window.webkitAudioContext)();
                const analyserNode = context.createAnalyser();
                analyserNode.fftSize = 256;
                analyserNode.smoothingTimeConstant = 0.9;
                if (instr1Src) setInstr1AudioContext(context);
                if (instr2Src) setInstr2AudioContext(context);
                if (instr3Src) setInstr3AudioContext(context);
                if (instr4Src) setInstr4AudioContext(context);
                if (instr5Src) setInstr5AudioContext(context);
                setAnalyser(analyserNode);

                const inst1Source = instr1Src ? context.createMediaElementSource(instr1Ref.current) : null;
                const inst2Source = instr2Src ? context.createMediaElementSource(instr2Ref.current) : null;
                const inst3Source = instr3Src ? context.createMediaElementSource(instr3Ref.current) : null;
                const inst4Source = instr4Src ? context.createMediaElementSource(instr4Ref.current) : null;
                const inst5Source = instr5Src ? context.createMediaElementSource(instr5Ref.current) : null;
                if (instr1Src) inst1Source.connect(analyserNode);
                if (instr2Src) inst2Source.connect(analyserNode);
                if (instr3Src) inst3Source.connect(analyserNode);
                if (instr4Src) inst4Source.connect(analyserNode);
                if (instr5Src) inst5Source.connect(analyserNode);
                analyserNode.connect(context.destination);
            }

            if (isPlaying) {
                if (instr1Src) instr1Ref.current.pause();
                if (instr2Src) instr2Ref.current.pause();
                if (instr3Src) instr3Ref.current.pause();
                if (instr4Src) instr4Ref.current.pause();
                if (instr5Src) instr5Ref.current.pause();
            } else {
                if (instr1Src) instr1Ref.current.play();
                if (instr2Src) instr2Ref.current.play();
                if (instr3Src) instr3Ref.current.play();
                if (instr4Src) instr4Ref.current.play();
                if (instr5Src) instr5Ref.current.play();
            }
            setIsPlaying(!isPlaying)
        } catch (error) {
            console.error('Error during play/pause', error);
        }
    };

    const handleStop = () => {
        if (instr1Src) instr1Ref.current.pause();
        if (instr2Src) instr2Ref.current.pause();
        if (instr3Src) instr3Ref.current.pause();
        if (instr4Src) instr4Ref.current.pause();
        if (instr5Src) instr5Ref.current.pause();

        if (instr1Src) instr1Ref.current.currentTime = 0;
        if (instr2Src) instr2Ref.current.currentTime = 0;
        if (instr3Src) instr3Ref.current.currentTime = 0;
        if (instr4Src) instr4Ref.current.currentTime = 0;
        if (instr5Src) instr5Ref.current.currentTime = 0;

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
        const audio = instr1Ref.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        }
    };

    const handleSeek = (e) => {
        const newTime = (e.target.value / 100) * instr1Ref.current.duration;
        if (instr1Src) instr1Ref.current.currentTime = newTime;
        if (instr2Src) instr2Ref.current.currentTime = newTime;
        if (instr3Src) instr3Ref.current.currentTime = newTime;
        if (instr4Src) instr4Ref.current.currentTime = newTime;
        if (instr5Src) instr5Ref.current.currentTime = newTime;
        setProgress(e.target.value)
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const full = instr1Ref.current.duration
        const fullTime = `${Math.floor(full / 60)}:${Math.floor(full % 60) < 10 ? "0" : ""}${Math.floor(full % 60)}  `

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} / ${fullTime}`
    }

    useEffect(() => {
        const audio = instr1Ref.current;
        if (audio) {
            audio.addEventListener("timeupdate", updateProgressBar);
            audio.addEventListener("loadedmetadata", updateProgressBar);
            return () => {
                audio.removeEventListener("timeupdate", updateProgressBar);
                audio.removeEventListener("loadedmetadata", updateProgressBar);
            };
        }
    }, []);

    useEffect(() => {
        const audio = instr1Ref.current;
        if (audio) {
            audio.addEventListener("ended", () => {
                setTrackID(trackID + 1);
            });
        }
        return () => {
            if (audio) {
                audio.removeEventListener("ended", () => { });
            }
        };
    }, []);

    useEffect(() => {
        if (instr1Ref.current) instr1Ref.current.volume = instr1Volume;
        if (instr2Ref.current) instr2Ref.current.volume = instr2Volume;
        if (instr3Ref.current) instr3Ref.current.volume = instr3Volume;
        if (instr4Ref.current) instr4Ref.current.volume = instr4Volume;
        if (instr5Ref.current) instr5Ref.current.volume = instr5Volume;
    }, [instr1Volume, instr2Volume, instr3Volume, instr4Volume, instr5Volume]);

    const handleInstr1Volume = (e) => {
        const instr1Volume = e.target.value;
        setInstr1Volume(instr1Volume);
    };
    const handleInstr2Volume = (e) => {
        const instr2Volume = e.target.value;
        setInstr2Volume(instr2Volume);
    };
    const handleInstr3Volume = (e) => {
        const instr3Volume = e.target.value;
        setInstr3Volume(instr3Volume);
    };
    const handleInstr4Volume = (e) => {
        const instr4Volume = e.target.value;
        setInstr4Volume(instr4Volume);
    };
    const handleInstr5Volume = (e) => {
        const instr5Volume = e.target.value;
        setInstr5Volume(instr5Volume);
    };

    const handleResetVolumes = () => {
        setInstr1Volume(0.7);
        setInstr2Volume(0.7);
        setInstr3Volume(0.7);
        setInstr4Volume(0.7);
        setInstr5Volume(0.7);
    };

    const handleInfo = () => {
        setHidden(false);
        setTimeout(() => {
            setHidden(true)
        }, 5000)
    };

    const handleSelectTrack = (id) => {
        setTrackID(id);
        handleStop();
        handlePlayPause();
    }

    return (
        <div className={styles.bg}>
            <div className={styles.all}><br />

                <label className={styles.name}>{currentSong.artist} - {currentSong.title}</label><br /><br />

                {instr1Src ? (<> <audio ref={instr1Ref} src={instr1Src} /> </>) : ""}
                {instr2Src ? (<> <audio ref={instr2Ref} src={instr2Src} /> </>) : ""}
                {instr3Src ? (<> <audio ref={instr3Ref} src={instr3Src} /> </>) : ""}
                {instr4Src ? (<> <audio ref={instr4Ref} src={instr4Src} /> </>) : ""}
                {instr5Src ? (<> <audio ref={instr5Ref} src={instr5Src} /></>) : ""}

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

                    <span className={styles.time}>{formatTime(currentTime)}</span>
                </div>

                <div className={styles.song}>
                    <label onMouseEnter={handleInfo} className={styles.info}>ℹ️</label>
                    <label className={styles.info}>{!hidden ? " Adjust instruments' volume as you like" : ""}</label><br /><br />

                    <div className={styles.col}>
                        <div className={styles.instr}>
                            <label>{instr1Src ? currentSong.instruments.inst1 : ""} </label><br />
                            <label>{instr2Src ? currentSong.instruments.inst2 : ""} </label><br />
                            <label>{instr3Src ? currentSong.instruments.inst3 : ""} </label><br />
                            <label>{instr4Src ? currentSong.instruments.inst4 : ""} </label><br />
                            <label>{instr5Src ? currentSong.instruments.inst5 : ""} </label><br />
                        </div>

                        <div className={styles.Volumes}>
                            {instr1Src ? (<>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={instr1Volume}
                                    onChange={handleInstr1Volume}
                                    className="volume-slider"
                                /><br />
                            </>) : ""}

                            {instr2Src ? (<>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={instr2Volume}
                                    onChange={handleInstr2Volume}
                                    className="volume-slider"
                                /><br />
                            </>) : ""}

                            {instr3Src ? (<>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={instr3Volume}
                                    onChange={handleInstr3Volume}
                                    className="volume-slider"
                                /><br />
                            </>) : ""}


                            {instr4Src ? (<>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={instr4Volume}
                                    onChange={handleInstr4Volume}
                                    className="volume-slider"
                                /><br />
                            </>) : ""}

                            {instr5Src ? (<>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={instr5Volume}
                                    onChange={handleInstr5Volume}
                                    className="volume-slider"
                                />
                            </>) : ""}
                        </div>

                        <div className={styles.AudioVisualizer}>
                            {instr1AudioContext && analyser && <Visualizer analyser={analyser} />}
                        </div>

                        <img src={imgSrc} className={styles.img} />
                    </div>
                    <button onClick={handleResetVolumes} className={styles.resetVolButton}>
                        Reset Volumes
                    </button>
                </div><br />
                <Playlist songs={songs} user={user} onSelectTrack={handleSelectTrack} />
            </div >
        </div>

    );
}

export default AudioPlayer;