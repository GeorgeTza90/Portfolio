import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import RegForm from "../../components/Forms/RegForm"


function Register() {
    const [heading, setHeading] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetService.getRegisterData();
                setHeading(data.heading);
            } catch (err) {
                setError("Failed to load data");
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <Heading heading={heading} />

            <div className="body">
                <RegForm />
            </div>
        </>
    );
}

export default Register;
