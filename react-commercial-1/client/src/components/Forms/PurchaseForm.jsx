import styles from "./purchseForm.module.css";
import Button1 from "../Buttons/Button1";
import LogoImg from "../../assets/logo2.png";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";

const NAME_REGEX = /^[A-z]{2,35}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function PurchaseForm() {
    const nameRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [ticketType, setTicketType] = useState("");
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setTicketType("")
        setTicketQuantity(1);
    };

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email]);
    useEffect(() => {
        setValidName(NAME_REGEX.test(firstName) && NAME_REGEX.test(lastName))
    }, [firstName, lastName]);

    useEffect(() => {
        let price = 0;
        switch (ticketType) {
            case "Mars - New Olympus":
                price = 14199.99 * ticketQuantity;
                break;
            case "Europa - Aquatropolis":
                price = 27599.99 * ticketQuantity;
                break;
            case "Titan - Titan Harbor":
                price = 32299.99 * ticketQuantity;
                break;
            case "Enceladus - Crystal Bay":
                price = 25699.99 * ticketQuantity;
                break;
            case "Ganymede - Auroria":
                price = 20599.99 * ticketQuantity;
                break;
            case "Callisto - Stormhaven":
                price = 13599.99 * ticketQuantity;
                break;
        }

        //price = (price.toFixed(2).toString().slice(0, -6) + "." + price.toFixed(2).toString().slice(-6, -3) + "," + price.toFixed(2).toString().slice(-2));
        price = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
        setPrice(price);
    }, [ticketType, ticketQuantity])

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/payment');
            }, 3000);
        }
    }, [success, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validName || !validEmail) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await PostService.postPurchaseData(
                { firstName, lastName, email, ticketType, ticketQuantity }
            );
            console.log("Purchasing:", response.data);

            setSuccess(true);
            resetForm();
        } catch (err) {
            console.log("Error during Purchase", err);
            setErrMsg("Error during Purchase")
            errRef.current.focus();
        }
    };


    return (
        <>
            <div className={styles.all}>

                {success ? (
                    <section>
                        <div>
                            Redirecting to Payment ...
                        </div>
                    </section>
                ) : (
                    <section className={styles.all}>
                        <div className={styles.Container}>
                            <form type="POST" onSubmit={handleSubmit}>
                                <img src={LogoImg} className={styles.logo} alt="IceCream Vacations" ></img>
                                <label className={styles.label}>Name</label>
                                <div className={styles.row}>
                                    <input
                                        type="text"
                                        id="firstName"
                                        ref={nameRef}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className={styles.myInput1}
                                        placeholder="First name"
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="namenote"
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                    />
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className={styles.myInput1}
                                        placeholder="Last name"
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="namenote"
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                    />
                                </div>
                                <span className={validName || !firstName || !lastName ? styles.offscreen : styles.invalid}> ❌ check name </span>
                                <p id="emailnote" className={nameFocus && !validName ? styles.instructions : styles.offscreen}>
                                    Must be 2-35 latin characters.
                                </p><br />

                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={styles.myInput2}
                                    placeholder="example@mail.com"
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                /><br />
                                <span className={validEmail || !email ? styles.offscreen : styles.invalid}> ❌ check email </span>
                                <p id="emailnote" className={emailFocus && !validEmail ? styles.instructions : styles.offscreen}>
                                    Must be a valid email.
                                </p><br /><br />

                                <div className={styles.row}>
                                    <label className={styles.label}>Destination</label>
                                    <label className={styles.label2}>Quantity</label>

                                </div><br />
                                <div className={styles.row}>
                                    <select
                                        id="ticketType"
                                        value={ticketType}
                                        onChange={(e) => setTicketType(e.target.value)}
                                        className={styles.myInput3}
                                        required
                                    >
                                        <option value="">-- Select a destination --</option>
                                        <option value="Mars - New Olympus">Mars - New Olympus</option>
                                        <option value="Europa - Aquatropolis">Europa - Aquatropolis</option>
                                        <option value="Titan - Titan Harbor">Titan - Titan Harbor</option>
                                        <option value="Enceladus - Crystal Bay">Enceladus - Crystal Bay</option>
                                        <option value="Ganymede - Auroria">Ganymede - Auroria</option>
                                        <option value="Callisto - Stormhaven">Callisto - Stormhaven</option>
                                    </select>
                                    <input
                                        type="number"
                                        id="ticketQuantity"
                                        value={ticketQuantity}
                                        onChange={(e) => setTicketQuantity(Number(e.target.value))}
                                        className={styles.myInput4}
                                        placeholder="1"
                                    />
                                </div><br />
                                <label className={styles.label}>Price: {price}</label><br /><br />

                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

                                <Button1 slot="Continue to Payment" disabled={!validName || !validEmail} />
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}

export default PurchaseForm;