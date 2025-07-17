import { useState } from "react";
import BeginButton from "../../components/buttons/BeginButton.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const ToDifficulty = () => {
        setLoading(true);

        setTimeout(() => {
            navigate("/difficulty");
        }, 2000);
    };

    return (
        <div>
            <BeginButton
                onClick={ToDifficulty}
                slot={loading ? "Loading..." : "Begin Adventure"}
                disabled={loading}
            />
        </div>
    );
}

export default Home;
