import styles from "./cards.module.css";
import { useState } from "react";

function StatsCard({ type, initialValue }) {
    const [value, setValue] = useState(initialValue);
    const [tempValue, setTempValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    const source = `/${type}.png`;

    const handleChange = (e) => setTempValue(e.target.value);

    const resetValue = () => setTempValue(initialValue);

    const confirmValue = () => {
        setValue(tempValue);
        setIsEditing(false);
    };

    return (
        <div className={styles.specStat}>
            <img src={source} alt={type} className={styles.statsImg} />
            {isEditing ? (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                        type="number"
                        value={tempValue}
                        onChange={handleChange}
                        autoFocus
                        style={{
                            width: "48px",
                            fontSize: "1.3rem",
                            backgroundColor: "rgba(73, 5, 110, 0.89)",
                        }}
                    />
                    <button
                        style={{
                            fontSize: "0.8rem",
                            backgroundColor: "rgba(109, 109, 109, 1)",
                            padding: "0.4rem 0.4rem",
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            resetValue();
                        }}
                    // onClick={confirmValue}
                    >
                        reset
                    </button>
                    <button
                        style={{
                            position: "relative",
                            zIndex: 10,
                            pointerEvents: "auto",
                            fontSize: "0.8rem",
                            backgroundColor: "rgba(73, 110, 5, 1)",
                            padding: "0.4rem 0.6rem",
                            color: "white",
                            cursor: "pointer",
                        }}
                        onPointerDown={(e) => {
                            e.preventDefault();
                            confirmValue();
                        }}
                    >
                        confirm
                    </button>
                </div>
            ) : (
                <span onClick={() => {
                    setTempValue(value);
                    setIsEditing(true);
                }}>
                    {value}
                </span>
            )}
        </div>
    );
}

export default StatsCard;
