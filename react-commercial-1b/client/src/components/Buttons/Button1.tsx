import { useState } from "react";
import type { MouseEventHandler, ReactNode} from "react";

interface Button1Props {
  slot?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button1({ slot = "Click Me", disabled, onClick }: Button1Props) {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    backgroundColor: isHovered ? "rgb(109, 124, 124)" : "rgb(202, 202, 202)",
    borderRadius: "25px",
    color: isHovered ? "#ffffff" : "#000000",
    padding: "10px 50px",
    cursor: "pointer",
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
