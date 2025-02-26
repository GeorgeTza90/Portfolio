import { useState } from "react";

function ShareButton({ slot = "Click Me", size = 3.8, disabled }) {
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        backgroundImage: isHovered ? "url(src/assets/share_hovered.png)" : "url(src/assets/share.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${size}ch`,
        padding: "20px",
        color: "aliceblue",
        fontWeight: "bold",
        fontSize: "larger",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
    };

    return (
        <button
            style={styles}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {slot}
        </button>
    );
}

export default ShareButton;
