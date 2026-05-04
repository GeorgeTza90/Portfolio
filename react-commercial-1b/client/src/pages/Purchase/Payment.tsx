import type { JSX } from "react";
import Heading from "../../layouts/Heading/Heading";
import UnderConstruction from "../../components/Other/UnderConstruction.tsx";

const Purchase = (): JSX.Element => {   
    return (<>
        <Heading heading={"Payment"} />
        <div className="body">
            <UnderConstruction />
        </div>
    </>);
}

export default Purchase;