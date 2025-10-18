import { useState} from "react";
import type {MouseEventHandler} from "react";

interface SlideButtonProps {
  slot?: React.ReactNode;
  size?: number;
  disabled?: boolean;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function SlideButton({
  slot = "Click Me",
  size = 3.8,
  disabled = false,
  type = "",
  onClick,
}: SlideButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const styles: React.CSSProperties = {
    backgroundImage: type === "prev"
      ? "url(/assets/prev.png)"
      : "url(/assets/next.png)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: `${size}ch`,
    padding: "20px",
    color: "aliceblue",
    fontWeight: "light",
    fontSize: "larger",
    cursor: "pointer",
    backgroundColor: !isHovered 
        ? "transparent"
        : "#ffffff13",
    border: "none",
    borderRadius: "5rem",
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

export default SlideButton;
