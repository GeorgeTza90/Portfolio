import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";
import styles from "./contactForm.module.css";
import Button1 from "../Buttons/Button1";


const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10,}$/;


function ContactForm({ user }) {
    const errRef = useRef();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setTopic("");
        setMessage("");
    };

    const handleContact = async (e) => {
        e.preventDefault();

        if (phoneNumber && !validPhoneNumber) {
            setErrMsg("Invalid phone number format.");
            return;
        }

        if (!firstName || !lastName || !validEmail || !topic || !message) {
            setErrMsg("Fill in all the form fields marked with *");
            return;
        }

        try {
            const response = await PostService.postContactData(firstName, lastName, email, phoneNumber, topic, message);
            console.log("Response Data:", response.data);

            setSuccess(true);
            resetForm();
        } catch (err) {
            console.error("Something went wrong:", err);
            setErrMsg(err.response?.status === 409 ? "Please recheck all form fields." : "Something went wrong");
            errRef.current.focus();
        }
    };

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
        setErrMsg("");
    }, [email, phoneNumber, message]);

    useEffect(() => {
        if (user && user !== "Guest") {
            setEmail(user);
        }

        if (success) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [user, success]);


    return (
        <>
            {success ? (
                <section className={styles.Container}>
                    <div className={styles.success}>
                        <h1>✅ Thank You For Contacting Us</h1>
                        <p>Redirecting ...</p>
                    </div>
                </section>
            ) : (
                <section className={styles.all}>
                    <div className={styles.Container}>
                        <form type="POST" onSubmit={handleContact}>
                            <div className={styles.name}>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className={styles.myInput1}
                                    placeholder="*First name"
                                />
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className={styles.myInput1}
                                    placeholder="*Last name"
                                />
                            </div>

                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={styles.myInput2}
                                placeholder="*Email"
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <span className={validEmail || !email ? styles.offscreen : styles.invalid}> ❌ check email </span>
                            <p id="emailnote" className={emailFocus && !validEmail ? styles.instructions : styles.offscreen}>
                                Must be a valid email.
                            </p><br />

                            <input
                                type="tel"
                                id="phonenumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                                className={styles.myInput2}
                                placeholder="Phone Number (optional)"
                                aria-invalid={validPhoneNumber ? "false" : "true"}
                                aria-describedby="phonenote"
                                onFocus={() => setPhoneNumberFocus(true)}
                                onBlur={() => setPhoneNumberFocus(false)}
                            />
                            <span className={validPhoneNumber || !phoneNumber ? styles.offscreen : styles.invalid}> ❌ check phone number</span>
                            <p id="phonenote" className={phoneNumberFocus && !validPhoneNumber ? styles.instructions : styles.offscreen}>
                                Must be a valid phone number format.
                            </p><br />

                            <select
                                id="topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className={styles.myInput2}
                                required
                            >
                                <option value="">-- Select a topic --</option>
                                <option value="General Inquiry">1. General Inquiry</option>
                                <option value="Booking Assistance">2. Booking Assistance</option>
                                <option value="Custom Travel Packages">3. Custom Travel Packages</option>
                                <option value="Safety & Travel Guidelines">4. Safety & Travel Guidelines</option>
                                <option value="Career Opportunities">5. Career Opportunities</option>
                            </select><br />

                            <textarea
                                name="message"
                                id="message"
                                value={message}
                                className={styles.message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="*Message"
                            >
                            </textarea><br />

                            <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>

                            <Button1 slot="Submit" disabled={!firstName || !lastName || !validEmail || !topic || !message} />
                        </form>
                    </div>
                </section >
            )}
        </>
    );
}

export default ContactForm;