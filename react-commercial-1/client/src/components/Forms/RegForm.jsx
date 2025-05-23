import styles from "./regForm.module.css";
import Button1 from "../Buttons/Button1";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function RegForm() {
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setUser("");
        setPwd("");
        setMatchPwd("");
        setEmail("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validName || !validPwd || !validMatch || !validEmail) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await PostService.postRegisterData(user, pwd, email);
            console.log("Response Data:", response.data);

            setSuccess(true);
            resetForm();
        } catch (err) {
            console.error("Error during registration:", err);
            setErrMsg(err.response?.status === 409 ? "This User Name or Email already exists" : "Registration Failed");
            errRef.current.focus();
        };
    };

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
        setValidEmail(EMAIL_REGEX.test(email));
        setErrMsg("");
    }, [user, pwd, matchPwd, email])

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, [success, navigate]);


    return (
        <>
            {success ? (
                <section className={styles.RegContainer}>
                    <div className={styles.success}>
                        <h1>✅ Successfully Registered</h1>
                        <p>Redirecting to Login...</p>
                    </div>
                </section>
            ) : (
                <section className={styles.RegContainer}>
                    <form onSubmit={handleSubmit} className={styles.text}>
                        <div>
                            <label htmlFor="username">User Name: </label>
                            <input
                                className={styles.myInput}
                                type="text"
                                id="username"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                value={user}
                                placeholder="username"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <span className={validName ? styles.valid : styles.offscreen}> ✅</span>
                            <span className={validName || !user ? styles.offscreen : styles.invalid}> ❌</span>
                            <p id="uidnote" className={userFocus && user && !validName ? styles.instructions : styles.offscreen}>4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.</p>

                        </div>

                        <div>
                            <label htmlFor="password">Create Password: </label>
                            <input
                                className={styles.myInput}
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                placeholder="password"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <span className={validPwd ? styles.valid : styles.offscreen}> ✅</span>
                            <span className={validPwd || !pwd ? styles.offscreen : styles.invalid}> ❌</span>
                            <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}> 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters.  </p>
                        </div>

                        <div>
                            <label htmlFor="confirm_pwd">Confirm Password: </label>
                            <input
                                className={styles.myInput}
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                placeholder="password"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <span className={validMatch && matchPwd ? styles.valid : styles.offscreen}> ✅</span>
                            <span className={validMatch || !matchPwd ? styles.offscreen : styles.invalid}> ❌</span>
                            <p id="confirmnote" className={matchFocus && !validMatch ? styles.instructions : styles.offscreen}> Must match the Create Password input field. </p>
                        </div>

                        <div>
                            <label htmlFor="email">Email: </label>
                            <input
                                className={styles.myInput}
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                placeholder="example@mail.com"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <span className={validEmail ? styles.valid : styles.offscreen}> ✅</span>
                            <span className={validEmail || !email ? styles.offscreen : styles.invalid}> ❌</span>
                            <p id="emailnote" className={emailFocus && !validEmail ? styles.instructions : styles.offscreen}> Must be a valid email.</p>
                        </div>

                        <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>

                        <Button1 slot="Sign Up" disabled={!validName || !validPwd || !validMatch || !validEmail} />
                    </form><br />

                    <a href="/login" className={styles.Registered}>
                        Already Registered?
                    </a>
                </section >
            )}
        </>
    );
}

export default RegForm;
