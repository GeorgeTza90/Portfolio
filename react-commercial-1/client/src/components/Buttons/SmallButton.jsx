import { useState } from "react";

function SmallButton({ slot = "Show " }) {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    backgroundColor: "rgba(109, 124, 124, 0)",
    border: "rgba(109, 124, 124, 0)",
    color: isHovered ? "rgb(255, 255, 255)" : "rgb(236, 236, 236)",
    textShadow: isHovered ? "2px 2px 10px rgba(0, 0, 0, 0.91)" : "2px 2px 10px rgba(0, 0, 0, 0.57)",
    padding: "10px 120px",
    cursor: "pointer",
  };

  return (
    <button
      style={styles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slot}
    </button>
  );
}

export default SmallButton

