import { useEffect, useState } from "react";
import type { JSX } from "react";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import UnderConstruction from "../../components/Other/UnderConstruction.tsx";

function Purchase(): JSX.Element {
  const [heading, setHeading] = useState < string > ("");
  const [error, setError] = useState < string | null > (null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getPaymentData();
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
        <UnderConstruction slot="Page Under Construction" />
      </div>
    </>
  );
}

export default Purchase;
