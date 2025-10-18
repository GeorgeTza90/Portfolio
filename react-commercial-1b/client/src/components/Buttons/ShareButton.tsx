import { useState} from "react";
import type {MouseEventHandler} from "react";

interface ShareButtonProps {
  slot?: React.ReactNode;
  size?: number;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function ShareButton({
  slot = "Click Me",
  size = 3.8,
  disabled = false,
  onClick,
}: ShareButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const styles: React.CSSProperties = {
    backgroundImage: isHovered
      ? "url(/assets/share_hovered.png)"
      : "url(/assets/share.png)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: `${size}ch`,
    padding: "20px",
    color: "aliceblue",
    fontWeight: "light",
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

export default ShareButton;
