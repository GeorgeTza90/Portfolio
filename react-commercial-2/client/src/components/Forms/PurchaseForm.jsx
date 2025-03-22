import styles from "./purchseForm.module.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";
import StoreButton from "../../components/Buttons/StoreButton";


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

    const [premium, setPremium] = useState(true);
    const [points, setPoints] = useState(0);
    const [price, setPrice] = useState(0);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPrice(0);
    };

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email]);
    useEffect(() => { setValidName(NAME_REGEX.test(firstName) && NAME_REGEX.test(lastName)) }, [firstName, lastName]);

    useEffect(() => {
        let calculatedPrice = points;
        if (premium) {
            calculatedPrice += 30;
        }
        setPrice(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(calculatedPrice));
    }, [premium, points]);


    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/');
            }, 4000);
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
                { firstName, lastName, email, premium, price }
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

            {success ? (
                <section className={styles.all}>
                    <div className={styles.Container}>
                        Oops cannot redirect to payment ...<br /><br />
                        {premium ? "but now you've got free premium" : "also you lost free premium"}
                    </div>
                </section>
            ) : (
                <section className={styles.all}>
                    <div className={styles.Container}>
                        <img src="src/assets/GP-Store.png" className={styles.img} />
                        <form type="POST" onSubmit={handleSubmit}>
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
                                <label className={styles.label}>Get Premium</label>
                                <label className={styles.label2}>Buy GP</label>

                            </div>
                            <div className={styles.row}>
                                <select
                                    id="premium"
                                    value={premium}
                                    onChange={(e) => setPremium(e.target.value === "true")}
                                    className={styles.myInput3}
                                    required
                                >
                                    <option value={true}>YES</option>
                                    <option value={false}>NO</option>
                                </select>
                                <input
                                    type="number"
                                    id="points"
                                    value={points}
                                    onChange={(e) => {
                                        const newPoints = Number(e.target.value);
                                        if (newPoints >= 0) {
                                            setPoints(newPoints);
                                        } else {
                                            setPoints(0);
                                        }
                                    }}
                                    className={styles.myInput4}
                                />
                            </div><br /><br />

                            <label className={styles.label}>Price: {price}</label><br /><br />
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

                            <StoreButton slot="Continue to Payment" disabled={!validName || !validEmail} fontSize="medium" size="300px" />
                        </form>
                    </div>
                </section >
            )
            }

        </>
    );
}

export default PurchaseForm;