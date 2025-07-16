import { useState, useRef } from "react";

function BeginButton({ slot = "Click Me", disabled, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const hoverSoundRef = useRef(null);
    const clickSoundRef = useRef(null);

    const styles = {
        backgroundColor: isHovered ? "rgba(196, 255, 202, 1)" : "rgba(41, 41, 41, 1)",
        borderRadius: "1rem",
        color: isHovered ? "#000000ff" : "#ffffffff",
        padding: "10px 30px",
        cursor: "pointer",
        boxShadow: isHovered
            ? "0 4px 15px rgb(65, 0, 90)"
            : "0 4px 25px rgba(0, 0, 0, 0.55)",
        transition: "all 0.2s ease"
    };

    const playSound = (ref) => {
        if (ref.current) {
            ref.current.currentTime = 0;
            ref.current.play().catch(() => { });
        }
    };

    return (
        <button
            style={styles}
            disabled={disabled}
            onMouseEnter={() => {
                setIsHovered(true);
                playSound(hoverSoundRef);
            }}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                playSound(clickSoundRef);
                if (onClick) {
                    setTimeout(() => {
                        onClick(e);
                    }, 2000)
                }
            }}
        >
            {slot}
            <audio ref={hoverSoundRef} src="/sounds/hover.mp3" preload="auto" />
            <audio ref={clickSoundRef} src="/sounds/click.mp3" preload="auto" />
        </button>
    );
}

export default BeginButton;
