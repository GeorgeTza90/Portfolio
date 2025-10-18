import type {JSX, MouseEventHandler} from "react"
import { useState } from "react";

interface LikeButtonProps {
    slot?: React.ReactNode;
    disabled?: boolean;
    size?: number;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function LikeButton({
    slot = "Click Me",
    disabled = false,
    size = 3.8,
    onClick,
}: LikeButtonProps): JSX.Element {
    const [isHovered, setIsHovered] = useState(false);

    const styles: React.CSSProperties = {
        backgroundImage: isHovered
            ? "url(/assets/heart_hovered.png)"
            : "url(/assets/heart.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${size}ch`,
        padding: "20px",
        color: !isHovered ? "aliceblue" : "black",
        fontWeight: "light",
        fontSize: "larger",
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: "transparent",
        border: "none",
    };

    return (
        <button
            style={styles}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            type="button"
        >
            {slot}
        </button>
    );
}

export default LikeButton;
