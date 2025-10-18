import styles from "./heading.module.css";

interface HeadingProps {
  heading?: string;
}

function Heading({ heading = "Current Page" }: HeadingProps) {
  return (
    <>
    {/* <br /><br /><br /> */}
      <div className={styles.heading}>        
        <h2>{heading}</h2>
      </div>
      
    </>
  );
}

export default Heading;
