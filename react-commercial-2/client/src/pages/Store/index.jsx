import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Heading from "../../layouts/Heading/Heading";
import GetService from "../../services/GetService";
import PurchaseForm from "../../components/Forms/PurchaseForm";

function Store() {
    const [heading, setHeading] = useState("");
    const [user, setUser] = useState("");
    const [cookies] = useCookies("auth_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetService.getStoreData(cookies.auth_token);
                setUser(data.user);
                setHeading(data.heading);

            } catch (err) {
                console.error("Error fetching home:", err);
                setUser(null);
                setHeading(`Welcome to GP Store`);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Heading heading={heading} /><br />

            <div className="body">
                <PurchaseForm user={user} />
            </div>
        </>
    )
}

export default Store;