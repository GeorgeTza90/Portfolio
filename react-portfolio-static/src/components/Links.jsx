import styles from "../styles/all.module.css";

export default function Links() {
    return(<>
        <div className={styles.LinksDiv}>
            <br/><br/>
            <a
                href={"https://github.com/GeorgeTza90/Portfolio"}
                className="contactIcon gitHub"
                target="_blank"
                rel="noopener noreferrer"
            />
            <a
                href={"https://linkedin.com/in/georgetzachristas"}
                className="contactIcon LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
            />
            <a
                href={"mailto:gtzahristas@gmail.com"}
                className="contactIcon mail"
                target="_blank"
                rel="noopener noreferrer"
            />
        </div>
    </>);
}