import React, { useState, useEffect, useCallback } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("Strong Password");

  const generatePassword = useCallback(() => {
    let password = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};':\"\\|,.<>/?`~";

    for (let i = 0; i < length; i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    setPassword(password);
  }, [length]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleCopyClick = () => {
    const input = document.querySelector("input[type='text']");
    input.select();
    document.execCommand("copy");
  };

  const [faded, setFaded] = useState(false);

  const handleRefreshClick = () => {
    generatePassword();
    setFaded(true);
    setTimeout(() => {
      setFaded(false);
    }, 250);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (length < 6) {
      setPasswordStrength("Bad Password");
    } else if (length > 9) {
      setPasswordStrength("Strong Password");
    } else {
      setPasswordStrength("Weak Password");
    }
  }, [length]);

  const backgroundColor = () => {
    if (passwordStrength === "Bad Password") {
      return "rgb(207,74,57)";
    } else if (passwordStrength === "Weak Password") {
      return "rgb(246,125,88)";
    } else if (passwordStrength === "Strong Password") {
      return "rgb(95,170,90)";
    }
  };

  return (
    <div>
      <h1 className="title">Create strong passwords with Password Generator</h1>
      <br />
      <br />
      <div
        className="password-input-div"
        style={{ backgroundColor: backgroundColor()}}
      >
        <div className="input-button-button-div">
          <input className="password-box" type="text" value={password} onChange={handlePasswordChange} />
          <button className={`refresh-button ${faded ? "fade" : ""}`} onClick={handleRefreshClick}>
            &#8634;
          </button>
          <button className="copy-password-btn" onClick={handleCopyClick}>
            Copy Password
          </button>
        </div>
        <p className="password-strength-text">{passwordStrength}</p>
      </div>
      <br />
      <br />
      <p>
        Use the slider, and select from the options, below, to lengthen your
        password and strengthen your security.
      </p>
      <p>Password Length (4-64)</p>
      <input
        type="range"
        min="4"
        max="64"
        value={length}
        onChange={handleLengthChange}
        style={{ width: "80%", display: "inline-block" }}
      />
      <br />
      <br />
      <span style={{ paddingLeft: "10px" }}>{length}</span>
    </div>
  );
};

export default PasswordGenerator;
