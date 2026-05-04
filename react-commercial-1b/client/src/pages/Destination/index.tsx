import { useEffect, useState } from "react";
import type { _Destination, DestinationData } from "../../types/types";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import DestCard from "../../components/Cards/DestCard";
import ErrorLoad from "../../components/Other/ErrorLoad";

const Destination: React.FC = () => {    
    const [destinations, setDestinations] = useState<_Destination[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: DestinationData = await GetService.getDestinationData();                                
                setDestinations(data.destinations);
            } catch (err) {
                setError("No Destinations Yet");
            }
        };

        fetchData();
    }, []);

    return (<>
        <Heading heading={"Our Destinations"} />
        <div className="body">            
            {error ? (<ErrorLoad error={error} />) : (<DestCard dest={destinations} />)}
        </div>        
    </>);
};

export default Destination;
