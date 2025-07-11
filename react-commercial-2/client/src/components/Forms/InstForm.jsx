import styles from "./uploadForm.module.css";
import { useState, useEffect } from "react";


const INST_REGEX = /^.{3,23}$/;

function InstForm({ num, onInstName, onInstFile }) {
    const nameID = `inst${num}_name`;
    const namePlaceholder = `Instrument ${num} Name`;
    const [instFile, setInstFile] = useState();
    const [instName, setInstName] = useState("");
    const [validInstName, setValidInstName] = useState(false);
    const [instFocus, setInstFocus] = useState(false);

    useEffect(() => setValidInstName(INST_REGEX.test(instName)), [instName]);

    const handleNameChange = (value) => {
        setInstName(value);
        onInstName(value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setInstFile(file);
        onInstFile(file);
    };


    return (
        <>
            <h2 className={styles.myH2}>Instrument {num}</h2>

            <div className={styles.fillContainer3}>
                <label>Name:</label>
                <input
                    className={styles.myInput}
                    type="text"
                    id={nameID}
                    placeholder={namePlaceholder}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                    aria-invalid={validInstName ? "false" : "true"}
                    aria-describedby="uidinst_name"
                    value={instName}
                    onFocus={() => setInstFocus(true)}
                    onBlur={() => setInstFocus(false)}
                />

                <label>File:</label>
                <input
                    className={styles.myInput}
                    type="file"
                    onChange={handleFileChange}
                    accept=".mp3, .wav, .flac"
                    id={`inst${num}_file`}
                    required
                />
                <div className={styles.checkContainer}>
                    <span className={validInstName && instFile ? styles.valid : styles.offscreen}> ✅</span>
                    <span className={!validInstName || !instFile ? styles.invalid : styles.offscreen}> ❌</span>
                </div>
            </div>

            <p id="uidinst_name" className={instFocus && !validInstName ? styles.instructions : styles.offscreen}>
                3 to 23 characters. Allowed special characters.
            </p>
        </>
    );
}

export default InstForm;
