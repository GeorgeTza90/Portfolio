import { useState, useRef } from "react";

function RemoveButton({
    slot = "Click Me",
    disabled, onClick,
    alt = "Remove Enemy",
    fontSize = "1.2rem",
    backgroundColor = "rgba(0, 0, 0, 0.61)",
    backgroundColorHovered = "rgba(196, 255, 202, 1)"
}) {
    const [isHovered, setIsHovered] = useState(false);

    const hoverSoundRef = useRef(null);
    const clickSoundRef = useRef(null);

    const styles = {
        backgroundColor: isHovered ? backgroundColorHovered : backgroundColor,
        borderRadius: "1rem",
        fontSize: fontSize,
        fontWeight: "bolder",
        color: isHovered ? "#ff0000ff" : "#ff00009b",
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
            {isHovered ? alt : slot}
        </button>
    );
}

export default RemoveButton;