import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../../Utils/Firebase/Firebase_config";
import { onValue, ref } from "firebase/database";

export default function UserForgotPass() {
  const navigate = useNavigate();

  const [Validation, setValidation] = useState("");
  const [owner, setOwner] = useState("");
  const [Email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const validationcheck = () => {
    setValidation("was-validated");
  };

  const checkUser = (e) => {
    e.preventDefault();
    var User = owner.replace("(", "").replace(")", "");
    const get_users = [];
    onValue(ref(db, "Users/" + User + "/Public/"), (snapshot) => {
      snapshot.val().forEach((e) => get_users.push(e));
      const valid =
        get_users.filter((item) => item.email === Email).length === 1;
      valid ? Succeccful() : Wrong();
      async function Succeccful() {
        await messageApi.open({
          type: "loading",
          content: "Checking...",
          duration: 1,
        });
        await message.success("Successful", 1.5);
        await sendPasswordResetEmail(auth, Email);
        return navigate("/clinic/signin");
      }
      async function Wrong() {
        await messageApi.open({
          type: "loading",
          content: "Checking...",
          duration: 1,
        });
        await message.error("Wrong User", 1.5);
      }
    });
  };

  return (
    <>
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
                      // src="/Logos/login_form.png"
                      src="ko16.jpeg"
                      alt="login form"
                      className="img-fluid object-fit-cover"
                      style={{ borderRadius: "1rem 0 0 1rem",height:"100vh" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                      <img src="web_logo_br.png" style={{width:"50px", height:"50px"}} className=" me-2 w-2 h-3" />{" "}
                        <span className="h1 fw-bold mb-0">Calcutta 16</span>
                        {contextHolder}
                      </div>
                      <form className={Validation} onSubmit={checkUser}>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Send reset email for your account {owner}
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
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-danger btn-lg btn-block"
                            onClick={validationcheck}
                            type="submit"
                          >
                            Validate
                          </button>
                        </div>
                        <Link
                          className="small text-muted"
                          to="/login"
                          style={{ textDecoration: "None" }}
                        >
                          Sign In
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
    </>
  );
}
