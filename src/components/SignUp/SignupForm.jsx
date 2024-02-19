import { useState, useEffect } from "react";
import "./SignupForm.css"; 

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(
      emailTouched && !validateEmail(email) ? "Invalid email format" : ""
    );
  }, [email, emailTouched]);

  useEffect(() => {
    setPasswordError(
      passwordTouched && password.length < 8
        ? "Password must be at least 8 characters long"
        : ""
    );
  }, [password, passwordTouched]);

  useEffect(() => {
    setFormValid(
      !emailError && !passwordError && name && country && age && password
    );
  }, [emailError, passwordError, name, country, age, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValid) {
      console.log("Form submitted:", { email, name, country, age, password });
      setSubmitSuccess(true);
      setEmail("");
      setName("");
      setCountry("");
      setAge("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      setEmailTouched(false);
      setPasswordTouched(false);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  const handleBlur = (field) => {
    if (field === "email") setEmailTouched(true);
    if (field === "password") setPasswordTouched(true);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          className={emailError ? "input-error" : ""}
        />
        {emailError && <div className="error">{emailError}</div>}
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          className={passwordError ? "input-error" : ""}
        />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      <button type="submit" disabled={!formValid}>
        Submit
      </button>
      {submitSuccess && (
        <div className="success-message">Signup successful!</div>
      )}
    </form>
  );
};

export default SignupForm;
