import { useState } from "react";
import type { JSX, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface NavButtonProps {
  slot?: React.ReactNode;
  size?: number;
  to: string;
  image?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

function NavButton({
  slot = "Click Me",
  size = 3.8,
  to = "/",
  image = "home",
  onClick,
}: NavButtonProps): JSX.Element {
    const [isHovered, setIsHovered] = useState(false);

    const styles: React.CSSProperties = {
        backgroundImage: !isHovered ? `url(/assets/${image}.png)` : `url(/assets/${image}_hovered.png)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${size}ch`,
        textShadow: !isHovered ? "transparent" : "1px 5px 5px rgba(0, 0, 0, 1)",
        maxWidth: "120px",
        minHeight: "50px",
        padding: "1px 1px",
        borderRadius: '2rem',
        color: "black",
        fontWeight: "light",
        fontSize: "larger",
        cursor: "pointer",        
        border: "none",
        display: "inline-block",
        textDecoration: "none",
        transition: "0.3s",
    };

    return (
        <Link 
            style={styles}
            to={to}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}

        >
        {slot}
        </Link>
    );
}

export default NavButton;
