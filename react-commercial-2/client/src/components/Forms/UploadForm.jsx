import styles from "./uploadForm.module.css";
import Button1 from "../Buttons/Button1";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";
import InstForm from "./InstForm";


const NAME_REGEX = /^[A-Za-z()]+(?: [A-Za-z()]+)*$/;

function UploadForm({ user }) {
    const username = user.username;
    let gp = user.gp;
    const errRef = useRef();
    const navigate = useNavigate();

    const [artist, setArtist] = useState("");
    const [validArtist, setValidArtist] = useState(false);
    const [artistFocus, setArtistFocus] = useState(false);

    const [song, setSong] = useState("");
    const [validSong, setValidSong] = useState(false);
    const [songFocus, setSongFocus] = useState(false);

    const [artworkFile, setArtworkFile] = useState("");

    const [numInstruments, setNumInstruments] = useState(1);
    const [instNames, setInstNames] = useState({});
    const [instFiles, setInstFiles] = useState({});

    const [GrandePoints, setGrandePoints] = useState();
    const [maxInstruments, setMaxInstruments] = useState();

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => setGrandePoints(user.gp), [user.gp]);
    useEffect(() => setValidArtist(NAME_REGEX.test(artist)), [artist]);
    useEffect(() => setValidSong(NAME_REGEX.test(song)), [song]);
    useEffect(() => {
        if (GrandePoints < 5 && GrandePoints > 0) {
            setMaxInstruments(GrandePoints + 1);
        } else if (GrandePoints >= 5) {
            setMaxInstruments(5);
        } else {
            setMaxInstruments(1)
        }
    }, [GrandePoints]);

    const resetForm = () => {
        setArtist("");
        setSong("");
        setInstNames({});
        setInstFiles({});
        setErrMsg("");
        setSuccess(false);
    };

    const handleFileChange = (e) => {
        setArtworkFile(e.target.files[0]);
    };

    const handleInstNameChange = (num) => (value) => {
        setInstNames((prevState) => ({
            ...prevState,
            [`inst${num}`]: value,
        }));
    };

    const handleInstFileChange = (num) => (file) => {
        setInstFiles((prevState) => ({
            ...prevState,
            [`inst${num}`]: file,
        }));
    };

    const handleNumInstruments = (num) => {
        if (numInstruments !== num) {
            const updatedInstNames = { ...instNames };
            const updatedInstFiles = { ...instFiles };

            for (let i = numInstruments; i >= num; i--) {
                delete updatedInstNames[`inst${i}`];
                delete updatedInstFiles[`inst${i}`];
            }

            setInstNames(updatedInstNames);
            setInstFiles(updatedInstFiles);
        }
        setNumInstruments(num);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUploading(true);

        if (!validArtist || !validSong || !artworkFile || !instFiles || !instNames) {
            setErrMsg("Please provide all required information.");
            return;
        }

        try {
            gp = GrandePoints - numInstruments + 1;
            console.log(`Remaining GP: ${gp}`);

            const response1 = await PostService.postCreateSongData(artist, song, artworkFile, numInstruments, instNames, instFiles, username, gp);
            console.log("Response Data:", response1.data);

            const response2 = await PostService.postUploadData(artist, song, artworkFile, numInstruments, instNames, instFiles);
            console.log("Response Data:", response2.data);

            setSuccess(true);
            resetForm();
            setUploading(false);
            navigate("/player")

        } catch (error) {
            setErrMsg("Error submitting form.");
            console.error("Submission error:", error);
        }
    };


    return (
        <>
            {uploading ? (
                <><br /><br />
                    UPLOADING YOUR SONG...<br /><br />
                    It will take a liiiiiitle time after submit, just be patient, ok?<br /><br /><br />
                </>
            ) : (
                <>
                    {success ? (
                        <section className={styles.RegContainer}>
                            <div className={styles.success}>
                                <h1>Successfully Uploaded</h1><br /><br />

                            </div>
                        </section>
                    ) : (
                        <section className={styles.RegContainer}>
                            <label>GrandePoints: {user.gp}</label>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.text}>
                                    <h2>About the song</h2>
                                    <div className={styles.fillContainer}>
                                        <label>Artist's Name:</label>
                                        <input
                                            className={styles.myInput}
                                            type="text"
                                            id="artist_name"
                                            autoComplete="off"
                                            placeholder="Artist"
                                            onChange={(e) => setArtist(e.target.value)}
                                            required
                                            aria-invalid={validArtist ? "false" : "true"}
                                            aria-describedby="uidartist"
                                            value={artist}
                                            onFocus={() => setArtistFocus(true)}
                                            onBlur={() => setArtistFocus(false)}
                                        />
                                        <div className={styles.checkContainer}>
                                            <span className={validArtist ? styles.valid : styles.offscreen}> ✅</span>
                                            <span className={!validArtist ? styles.invalid : styles.offscreen}> ❌</span>
                                        </div>
                                    </div>
                                    <p id="uidartist" className={artistFocus && !validArtist ? styles.instructions : styles.offscreen}> 1 to 23 characters. Allowed special characters.</p>
                                    <br />

                                    <div className={styles.fillContainer}>
                                        <label>Song's Name:</label>
                                        <input
                                            className={styles.myInput}
                                            type="text"
                                            id="song_name"
                                            placeholder="Song"
                                            onChange={(e) => setSong(e.target.value)}
                                            required
                                            aria-invalid={validSong ? "false" : "true"}
                                            aria-describedby="uidsong"
                                            value={song}
                                            onFocus={() => setSongFocus(true)}
                                            onBlur={() => setSongFocus(false)}
                                        />
                                        <div className={styles.checkContainer}>
                                            <span className={validSong ? styles.valid : styles.offscreen}> ✅</span>
                                            <span className={!validSong ? styles.invalid : styles.offscreen}> ❌</span>
                                        </div>
                                    </div>
                                    <p id="uidsong" className={songFocus && !validSong ? styles.instructions : styles.offscreen}> 1 to 23 characters. Allowed special characters.</p>
                                    <br /><br />

                                    <h2>Song's Artwork</h2>
                                    <div className={styles.fillContainer2}>
                                        <label>File:</label>
                                        <input
                                            className={styles.myInput}
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            id="song_img"
                                            required
                                        />
                                        <div>
                                            <span className={artworkFile ? styles.valid : styles.offscreen}> ✅</span>
                                            <span className={!artworkFile ? styles.invalid : styles.offscreen}> ❌</span>
                                        </div>
                                    </div><br /><br />

                                    <label>Select Number of Instruments:</label>
                                    <select
                                        value={numInstruments}
                                        onChange={(e) => handleNumInstruments(Number(e.target.value))}
                                        required
                                    >
                                        {[...Array(maxInstruments)].map((_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select><br /><br />

                                    {[...Array(numInstruments)].map((_, index) => (
                                        <InstForm
                                            key={index + 1}
                                            num={index + 1}
                                            onInstName={handleInstNameChange(index + 1)}
                                            onInstFile={handleInstFileChange(index + 1)}
                                        />
                                    ))}<br /><br />

                                    <Button1 type="submit" slot="Submit Song" disabled={!validArtist || !validSong} />
                                </div>

                            </form>
                        </section>
                    )}
                </>
            )}
        </>
    );
}

export default UploadForm;
