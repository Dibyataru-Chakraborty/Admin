import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Utils/Firebase/Firebase_config";

export default function UserLogin() {
  const navigate = useNavigate();

  const [Validation, setValidation] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [wrong, setWrong] = useState("btn btn-danger btn-lg btn-block");
  const validationcheck = () => {
    setValidation("was-validated");
  };

  const checkPassword = (event) => {
    const passowrd = event.target.checkValidity();
    setWrong(
      passowrd
        ? "btn btn-success btn-lg btn-block"
        : "btn btn-danger btn-lg btn-block"
    );
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          const UID = userCredential.user.uid;
          localStorage.setItem("user", JSON.stringify(UID));
        })
        .then(() => {
          message.success("Successfully Login", 1.5);
          navigate("/");
        });
    } catch (error) {
      console.log(error);
      const errorMessage = error.message.includes(AuthErrorCodes.USER_DELETED)
        ? "User not found"
        : error.message.includes(AuthErrorCodes.INVALID_PASSWORD)
        ? "Wrong Password"
        : error.message.includes(AuthErrorCodes.NETWORK_REQUEST_FAILED)
        ? "Check your connection"
        : "";
      message.error(errorMessage, 2.5);
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div
                className="row g-0 rounded"
                style={{ boxShadow: "20px 2rem 3em rgba(121, 115, 115, 1)" }}
              >
                <div className="col-md-6 col-lg-5 d-none d-md-block h-75">
                  <img
                    src="ko16.jpeg"
                    alt="login form"
                    className="img-fluid object-fit-cover "
                    style={{ borderRadius: "1rem 0 0 1rem", height: "100vh" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <img
                        src="web_logo_br.png"
                        style={{ width: "50px", height: "50px" }}
                        className=" me-3 w-2 h-3"
                        alt="c16"
                      />{" "}
                      <span className="h1 fw-bold mb-0">Calcutta 16</span>
                    </div>
                    <form className={Validation} onSubmit={login}>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1 }}
                      >
                        Sign into your account
                      </h5>
                      <div className="form-outline">
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          placeholder="Email Address"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter valid Email address.
                        </div>
                      </div>
                      <div className="form-outline">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          minLength={8}
                          onKeyUp={checkPassword}
                          placeholder="Password"
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                          required
                          autoComplete="True"
                          id="password"
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          className="form-control form-control-lg"
                        />
                        <div className="invalid-feedback">
                          Please enter valid passowrd.
                        </div>
                      </div>
                      {/* <div className="form-check mb-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checked"
                          checked={remeber}
                          onChange={checked}
                        />
                        <label className="form-check-label" htmlFor="checked">
                          Remember me
                        </label>
                      </div> */}
                      <div className="pt-1 mb-4">
                        <button
                          className={wrong}
                          onClick={validationcheck}
                          type="submit"
                        >
                          Login
                        </button>
                        <span className="mb-2 mx-2 pb-lg-2">
                          Do have an account?{" "}
                          <Link
                            className="small text-muted"
                            to="/signup"
                            style={{ textDecoration: "None" }}
                          >
                            Create Account here
                          </Link>
                        </span>
                      </div>

                      <Link
                        className="small text-muted"
                        to="/forgotpassword"
                        style={{ textDecoration: "None" }}
                      >
                        Forgot password?
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
