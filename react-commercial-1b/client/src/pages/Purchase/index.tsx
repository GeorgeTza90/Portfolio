import { useEffect, useState } from "react";
import type { JSX } from "react"
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import PurchaseForm from "../../components/Forms/PurchaseForm";

interface PurchaseData {
  heading: string;
}

function Purchase(): JSX.Element {
  const [heading, setHeading] = useState<string>("");
  const [_destination, _setDestination] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PurchaseData = await GetService.getPurchaseData();
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
        <PurchaseForm />
      </div>
    </>
  );
}

export default Purchase;
