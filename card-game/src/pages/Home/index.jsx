import BeginButton from "../../components/buttons/BeginButton.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    const ToDifficulty = () => {
        navigate("/difficulty");
    }



    return (
        <>
            <BeginButton slot={"Begin Adventure"} onClick={ToDifficulty} />
        </>
    )
}

export default Home;