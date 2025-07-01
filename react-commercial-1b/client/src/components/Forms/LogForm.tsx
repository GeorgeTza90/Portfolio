import { useCookies } from "react-cookie";
import { useEffect, useState, useRef } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";
import styles from "./logForm.module.css";
import Button1 from "../Buttons/Button1.tsx";

function LogForm() {
  const errRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [_cookies, setCookies] = useCookies(['auth_token']);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await PostService.postLoginData(email, password);
      console.log("Response Data:", response);

      const { token } = response;
      setCookies('auth_token', token);

      setSuccess(true);
      setErrMsg("");
    } catch (err) {
      console.error("Login error:", err);
      setErrMsg("Invalid email or password");
    }
  };

  useEffect(() => setErrMsg(""), [email, password]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <section className={styles.LogContainer}>
      {success ? (
        <div className={styles.success}>
          <h1>✅</h1>
          <h1>Login Successful </h1>
          <p>Redirecting... </p>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className={styles.text}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.myInput}
              placeholder="example@mail.com"
            />   
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.myInput}
              placeholder="password"
            />
            <br />
            <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen}>
              {errMsg}
            </p>
            <br />

            <Button1 slot="Sign In" disabled={!email || !password} />
          </form>
          <br />

          <a href="/register" className={styles.signInMsg}>
            What? You don't have an account yet?
          </a>
        </div>
      )}
    </section>
  );
}

export default LogForm;
