import React, { useState } from "react";
import "./UserSignUP.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Utils/Firebase/Firebase_config";
import { ref, set } from "firebase/database";
import { message } from "antd";

const UserSignUP = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [Validation, setValidation] = useState("");
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

  const Signup = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, Email, Password).then(
      async (userCredential) => {
        const uid = userCredential.user.uid;

        const User = {
          Username,
          Email,
          UID: uid,
        };
        await set(ref(db, `Users/${uid}/`), User).then(() => {
          message.success("Successfully Created").then(() => {
            navigate("/login");
          });
        });
      }
    );
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
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="ko16.jpeg"
                    alt="login form"
                    className="img-fluid object-fit-cover"
                    style={{ borderRadius: " 1rem 0 0 1rem", height: "100vh" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form className={Validation} onSubmit={Signup}>
                      <div className="d-flex align-items-center mb-1 pb-1">
                        <img
                          src="web_logo_br.png"
                          alt="CT16"
                          style={{ width: "50px", height: "50px" }}
                          className=" me-3 w-2 h-3"
                        />{" "}
                        <span className="h1 fw-bold mb-0">Calcutta 16</span>
                      </div>

                      <h5
                        className="fw-normal mb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div className="form-outline">
                        <input
                          type="text"
                          id="Username"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setUsername(event.target.value);
                          }}
                        />
                        <label className="form-label" for="Username">
                          Username
                        </label>
                      </div>
                      <div className="form-outline">
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                        <label className="form-label" for="email">
                          Email address
                        </label>
                      </div>

                      <div className="form-outline">
                        <input
                          type="password"
                          minLength={8}
                          placeholder="Password"
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                          required
                          onKeyUp={checkPassword}
                          autoComplete="True"
                          id="password"
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="password">
                          Password
                        </label>
                      </div>

                      <div className="pt-1">
                        <button
                          // className="btn btn-dark btn-lg btn-block"
                          className={wrong}
                          type="submit"
                          onClick={validationcheck}
                        >
                          Register
                        </button>
                        <span
                          className="mx-2 pb-lg-2"
                          style={{ color: " #393f81" }}
                        >
                          Do have an account?{" "}
                          <Link to="/login" style={{ color: "#393f81" }}>
                            Login here
                          </Link>
                        </span>
                      </div>
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
};
export default UserSignUP;
