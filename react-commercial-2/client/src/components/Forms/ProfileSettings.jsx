import styles from "./regForm.module.css";
import StoreButton from "../Buttons/StoreButton";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";
import AvatarSelector from "./AvatarSelector";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Profile({ user, avatars, songs }) {
    const errRef = useRef();
    const navigate = useNavigate();

    const userID = user.id;
    const [username, setUsername] = useState(user.username);
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(true);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [email, setEmail] = useState(user.email);
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setUsername("");
        setPwd("");
        setEmail("");
        setSelectedAvatar(null);
    };

    useEffect(() => setUsername(user.username), [user]);
    useEffect(() => setEmail(user.email), [user]);
    useEffect(() => setSelectedAvatar(user.avatar), [user]);
    useEffect(() => setValidName(USER_REGEX.test(user.username)), [user]);
    useEffect(() => setValidPwd(PWD_REGEX.test(pwd)), [pwd]);
    useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email]);
    useEffect(() => setErrMsg(""), [user, pwd, email]);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/');
            }, 1200);
        }
    }, [success, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validName || !validEmail || !selectedAvatar) {
            setErrMsg("Please fill out all fields correctly and select an avatar.");
            return;
        }

        if (pwd && !validPwd) {
            setErrMsg("Invalid New Password");
            return;
        }

        try {
            const response = await PostService.postProfileData(username, pwd, email, selectedAvatar, userID);
            console.log("Response Data:", response.data);

            setSuccess(true);
            resetForm();
        } catch (err) {
            console.error("Error during registration:", err);
            setErrMsg(err.response?.status === 409 ? "This User Name or Email already exists" : "Profile Update Failed");
            errRef.current.focus();
        };
    };


    return (
        <>
            {success ? (
                <section className={styles.RegContainer}>
                    <div className={styles.success}>
                        <h1>✅ Profile Settings Changed Successfully</h1>
                    </div>
                </section>
            ) : (
                <section className={styles.RegContainer}>
                    <form onSubmit={handleSubmit} >
                        <div className={styles.text}>

                            <div className={styles.fillContainer}>
                                <label htmlFor="username">User Name: </label>
                                <input
                                    className={styles.myInput}
                                    type="text"
                                    id="username"
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    value={username}
                                    placeholder="username"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <div className={styles.checkContainer}>
                                    <span className={validName ? styles.valid : styles.offscreen}> ✅</span>
                                    <span className={validName || !user ? styles.offscreen : styles.invalid}> ❌</span>
                                </div>
                            </div>
                            <p id="uidnote" className={userFocus && user && !validName ? styles.instructions : styles.offscreen}>4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.</p>

                            <div className={styles.fillContainer}>
                                <label htmlFor="password">New Password: </label>
                                <input
                                    className={styles.myInput}
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    placeholder="password"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <div className={styles.checkContainer}>
                                    <span className={validPwd ? styles.valid : styles.offscreen}> ✅</span>
                                    <span className={validPwd || !pwd ? styles.offscreen : styles.invalid}> ❌</span>
                                </div>
                            </div>
                            <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}> 8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character. Allowed special characters.  </p>

                            <div className={styles.fillContainer}>
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
                                <div className={styles.checkContainer}>
                                    <span className={validEmail ? styles.valid : styles.offscreen}> ✅</span>
                                    <span className={validEmail || !email ? styles.offscreen : styles.invalid}> ❌</span>
                                </div>
                            </div>
                            <p id="emailnote" className={emailFocus && !validEmail ? styles.instructions : styles.offscreen}> Must be a valid email.</p>
                        </div><br />

                        <label htmlFor="avatar">Change Avatar: </label><br /><br />
                        <div className={styles.avatars}>
                            {avatars && avatars.length > 0 ? (
                                avatars.map((avatar) => (
                                    <div key={avatar.id} >
                                        <AvatarSelector avatar={avatar} selectedAvatar={selectedAvatar} useAvatar={setSelectedAvatar} />
                                    </div>
                                ))
                            ) : (
                                <p>No avatars available</p>
                            )}
                        </div><br /><br />

                        <div className={styles.buttonContainer}>
                            <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>

                            <StoreButton slot="Submit Changes" disabled={!validName || !validEmail || !selectedAvatar} />

                        </div>
                    </form>
                </section>
            )}
        </>
    );
}

export default Profile;
