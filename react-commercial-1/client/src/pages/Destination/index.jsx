import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import DestCard from "../../components/Cards/DestCard";


function Destination() {

  const [heading, setHeading] = useState("");
  const [destinations, setDestinations] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getDestinationData();
        setHeading(data.heading);
        setDestinations(data.destinations);
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
        <DestCard dest={destinations} />
      </div>

    </>
  );
}

export default Destination;
