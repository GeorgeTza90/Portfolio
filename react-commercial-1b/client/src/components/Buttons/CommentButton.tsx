import { useState } from "react";
import type { ButtonProps } from "../../types/types";

const CommentButton = ({ slot = "Click Me", disabled = false, size = 3.8, onClick }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles: React.CSSProperties = {
    backgroundImage: isHovered ? "url(/assets/comment_hovered.png)" : "url(/assets/comment.png)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: `${size}ch`,
    padding: "20px",
    color: !isHovered ? "aliceblue" : "black",
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

export default CommentButton;
