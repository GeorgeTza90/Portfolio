import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import PurchaseForm from "../../components/Forms/PurchaseForm";


function Purchase() {
    const [heading, setHeading] = useState("");
    const [destination, setDestination] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetService.getPurchaseData();
                setHeading(data.heading);

            } catch (err) {
                setError("Failed to load data")
            }
        }

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <Heading heading={heading} />

            <div className="body">
                <PurchaseForm destination={destination} />
            </div>
        </>
    );
}

export default Purchase;
