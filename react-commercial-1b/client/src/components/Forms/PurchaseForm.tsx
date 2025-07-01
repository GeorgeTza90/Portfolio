import styles from "./purchseForm.module.css";
import Button1 from "../Buttons/Button1";
import LogoImg from "/assets/logo2.png";
import { useRef, useState, useEffect } from "react";
import type { FormEvent, ChangeEvent} from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";

const NAME_REGEX = /^[A-z]{2,35}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function PurchaseForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);
  const [nameFocus, setNameFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [ticketType, setTicketType] = useState<string>("");
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [price, setPrice] = useState<string>("$0.00");

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setTicketType("");
    setTicketQuantity(1);
    setPrice("$0.00");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validName || !validEmail) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await PostService.postPurchaseData({
        firstName,
        lastName,
        email,
        ticketType,
        ticketQuantity,
      });
      console.log("Purchasing:", response.data);

      setSuccess(true);
      resetForm();
    } catch (err: any) {
      console.log("Error during Purchase", err);
      setErrMsg("Error during Purchase");
      errRef.current?.focus();
    }
  };

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setValidName(NAME_REGEX.test(firstName) && NAME_REGEX.test(lastName));
  }, [firstName, lastName, email]);

  useEffect(() => {
    let calculatedPrice = 0;

    switch (ticketType) {
      case "Mars - New Olympus":
        calculatedPrice = 14199.99 * ticketQuantity;
        break;
      case "Europa - Aquatropolis":
        calculatedPrice = 27599.99 * ticketQuantity;
        break;
      case "Titan - Titan Harbor":
        calculatedPrice = 32299.99 * ticketQuantity;
        break;
      case "Enceladus - Crystal Bay":
        calculatedPrice = 25699.99 * ticketQuantity;
        break;
      case "Ganymede - Auroria":
        calculatedPrice = 20599.99 * ticketQuantity;
        break;
      case "Callisto - Stormhaven":
        calculatedPrice = 13599.99 * ticketQuantity;
        break;
      default:
        calculatedPrice = 0;
    }

    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(calculatedPrice);

    setPrice(formattedPrice);
  }, [ticketType, ticketQuantity]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/payment");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className={styles.all}>
      {success ? (
        <section>
          <div>Redirecting to Payment ...</div>
        </section>
      ) : (
        <section className={styles.all}>
          <div className={styles.Container}>
            <form onSubmit={handleSubmit}>
              <img
                src={LogoImg}
                className={styles.logo}
                alt="IceCream Vacations"
              />
              <label className={styles.label}>Name</label>
              <div className={styles.row}>
                <input
                  type="text"
                  id="firstName"
                  ref={nameRef}
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                  }
                  required
                  className={styles.myInput1}
                  placeholder="Last name"
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="namenote"
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                />
              </div>
              <span
                className={
                  validName || !firstName || !lastName
                    ? styles.offscreen
                    : styles.invalid
                }
              >
                ❌ check name
              </span>
              <p
                id="namenote"
                className={nameFocus && !validName ? styles.instructions : styles.offscreen}
              >
                Must be 2-35 latin characters.
              </p>
              <br />

              <label className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
                className={styles.myInput2}
                placeholder="example@mail.com"
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <br />
              <span
                className={
                  validEmail || !email ? styles.offscreen : styles.invalid
                }
              >
                ❌ check email
              </span>
              <p
                id="emailnote"
                className={emailFocus && !validEmail ? styles.instructions : styles.offscreen}
              >
                Must be a valid email.
              </p>
              <br />
              <br />

              <div className={styles.row}>
                <label className={styles.label}>Destination</label>
                <label className={styles.label2}>Quantity</label>
              </div>
              <br />
              <div className={styles.row}>
                <select
                  id="ticketType"
                  value={ticketType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setTicketType(e.target.value)
                  }
                  className={styles.myInput3}
                  required
                >
                  <option value="">-- Select a destination --</option>
                  <option value="Mars - New Olympus">Mars - New Olympus</option>
                  <option value="Europa - Aquatropolis">
                    Europa - Aquatropolis
                  </option>
                  <option value="Titan - Titan Harbor">Titan - Titan Harbor</option>
                  <option value="Enceladus - Crystal Bay">Enceladus - Crystal Bay</option>
                  <option value="Ganymede - Auroria">Ganymede - Auroria</option>
                  <option value="Callisto - Stormhaven">Callisto - Stormhaven</option>
                </select>
                <input
                  type="number"
                  id="ticketQuantity"
                  value={ticketQuantity}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTicketQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className={styles.myInput4}
                  placeholder="1"
                  min={1}
                />
              </div>
              <br />
              <label className={styles.label}>Price: {price}</label>
              <br />
              <br />

              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
              </p>

              <Button1 slot="Continue to Payment" disabled={!validName || !validEmail} />
            </form>
          </div>
        </section>
      )}
    </div>
  );
}

export default PurchaseForm;
