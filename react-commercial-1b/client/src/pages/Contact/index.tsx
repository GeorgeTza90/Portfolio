import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import type { ContactData } from "../../types/types";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import ContactForm from "../../components/Forms/ContactForm";

const Contact: React.FC = () => {    
    const [cookies] = useCookies(["auth_token"]);
    const [user, setUser] = useState < string > ("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ContactData = await GetService.getContactData(cookies.auth_token);                
                setUser(data.user || "Guest");
            } catch (err) {
                console.error("Error fetching data:", err);                
                setUser("Guest");
            }
        };

        fetchData();
    }, [cookies.auth_token]);

    return (<>
        <Heading heading={"Contact Us"} />
        <div className="body">
            <ContactForm user={user} />
        </div>
    </>);
};

export default Contact;
