import { useEffect, useState } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import DestCard from "../../components/Cards/DestCard";

interface Destination {
  id: number;
  planet: string;
  city: string;
  text: string;
  price: number;
}

interface DestinationData {
  heading: string;
  destinations: Destination[];
}

const Destination: React.FC = () => {
  const [heading, setHeading] = useState<string>("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DestinationData = await GetService.getDestinationData();
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
      <br /><br />
    </>
  );
};

export default Destination;
