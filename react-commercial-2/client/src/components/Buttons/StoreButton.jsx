import { useState } from "react";

function Button1({ slot = "Click Me", disabled, onClick, size, fontSize }) {
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        backgroundColor: isHovered ? "rgb(246, 255, 0)" : "rgb(202, 202, 202)",
        borderRadius: "25px",
        color: isHovered ? "rgb(8, 0, 255)" : "rgb(0, 0, 0)",
        padding: "10px 50px",
        cursor: !disabled ? "pointer" : "",
        width: size ? size : "250px",
        height: "auto",
        fontSize: fontSize ? fontSize : "large",
        fontWeight: "bolder",
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

export default Button1;
