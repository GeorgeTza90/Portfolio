import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import LogForm from "../../components/Forms/LogForm"


function LogIn() {
    const [heading, setHeading] = useState < string > ("");
    const [error, setError] = useState < string | null > (null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetService.getLoginData();
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
                <LogForm />
            </div>
        </>
    );
}

export default LogIn;
