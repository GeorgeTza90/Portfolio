import { useState } from "react";


function CommentButton({ slot = "Click Me", disabled, size = 3.8, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        backgroundImage: isHovered ? "url(/assets/comment_hovered.png)" : "url(/assets/comment.png)",
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
            onClick={onClick}
        >
            {slot}
        </button>
    );
}

export default CommentButton;
