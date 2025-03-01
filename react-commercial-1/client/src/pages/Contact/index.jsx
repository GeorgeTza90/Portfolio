import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import ContactForm from "../../components/Forms/ContactForm";


function Contact() {
  const [heading, setHeading] = useState("");
  const [cookies] = useCookies("auth_token");
  const [user, setUser] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getContactData(cookies.auth_token);
        setHeading(data.heading || "Contact Us");
        setUser(data.user || "Guest");
      } catch (err) {
        console.error("Error fetching data:", err);
        setHeading("Our News");
        setUser("Guest");
      }
    };

    fetchData();
  }, [cookies.auth_token]);


  return (
    <>
      <Heading heading={heading} />

      <div className="body">
        <ContactForm user={user} />
      </div>
    </>
  );
}

export default Contact;
