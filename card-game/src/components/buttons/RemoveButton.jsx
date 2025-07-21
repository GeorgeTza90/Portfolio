import { useState, useRef } from "react";

function RemoveButton({ slot = "Click Me", disabled, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const hoverSoundRef = useRef(null);
    const clickSoundRef = useRef(null);

    const styles = {
        backgroundColor: isHovered ? "rgba(196, 255, 202, 1)" : "rgba(0, 0, 0, 0.61)",
        borderRadius: "1rem",
        fontSize: "1.2rem",
        fontWeight: "bolder",
        color: isHovered ? "#ff00009b" : "#ff0000ff",
        cursor: "pointer",
        boxShadow: isHovered
            ? "0 4px 15px rgb(65, 0, 90)"
            : "0 4px 25px rgba(0, 0, 0, 0.55)",
        transition: "all 0.2s ease"
    };

    return (
        <button
            style={styles}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {isHovered ? "Remove Enemy" : slot}
        </button>
    );
}

export default RemoveButton;