import { useState } from "react";
import type { JSX } from "react"
import Heading from "../../layouts/Heading/Heading";
import PurchaseForm from "../../components/Forms/PurchaseForm";

const Purchase = (): JSX.Element => {    
    const [_destination, _setDestination] = useState<string>("");  

    return (<>
        <Heading heading={"Purchase Tickets"} />
        <div className="body">
            <PurchaseForm />
        </div>
    </>);
}

export default Purchase;