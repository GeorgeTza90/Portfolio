import Heading from "../../layouts/Heading/Heading.tsx";
import AboutCard from "../../components/Cards/AboutCard.tsx";

const About = () => {
    return (<>
        <Heading heading={"About Us"} />
        <div className="body">
            <AboutCard />
        </div>
    </>);
}

export default About;
