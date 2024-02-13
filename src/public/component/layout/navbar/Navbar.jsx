import React, { useEffect, useState } from "react";
import "./nav.css";
import AuthHandle from "../../../../Utils/Authentication/AuthHandle";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [CartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("Cartdata")) || []
  );
  const Url = useParams();
  const [User, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || "");
    setCartList(JSON.parse(localStorage.getItem("Cartdata")) || []);
  }, [Url]);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top navbar-light p-3 shadow-sm"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="/web_logo_br.png"
              alt="ct16"
              style={{ width: "35px", height: "35px" }}
              className=" me-2 w-2 h-3"
            />{" "}
            <strong>
              CALCUTTA 16
            </strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <div className="ms-1 d-none d-lg-block " style={{width:"400px"}}>
              <div className="input-group border rounded-pill p-1 shadow-sm">
                <div className="input-group-prepend border-0">
                  <button
                    id="button-addon4"
                    type="button"
                    className="btn btn-link text-danger"
                  >
                    <i className="fa fa-search" />
                  </button>
                </div>
                <input
                  type="search"
                  placeholder="What're you searching for?"
                  aria-describedby="button-addon4"
                  className="form-control bg-none border-0"
                />
              </div>
            </div>
            <ul className="navbar-nav m-auto ">
              <div className=" mt-3 d-lg-none d-sm-block d-xs-block">
                <div className="input-group mb-1 border rounded-pill p-1">
                  <div className="input-group-prepend border-0">
                    <button
                      id="button-addon4"
                      type="button"
                      className="btn btn-link text-danger"
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                  <input
                    type="search"
                    placeholder="What're you searching for?"
                    aria-describedby="button-addon4"
                    className="form-control bg-none border-0"
                  />
                </div>
              </div>
              <li className="nav-item">
               
              </li>
              <li className="nav-item">
                <Link className="nav-link me-3 text-uppercase" to="/products">
                  <p
                    className=" m-0"
                    data-bs-target="#navbarNavDropdown"
                    data-bs-toggle="collapse"
                  >
                    Products
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pb-2  text-uppercase" to="#">
                  <p
                    className=" m-0"
                    data-bs-target="#navbarNavDropdown"
                    data-bs-toggle="collapse"
                  >
                    About
                  </p>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav m-auto ">
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="nav-link text-uppercase position-relative"
                >
                  <p
                    className=" m-0"
                    data-bs-target="#navbarNavDropdown"
                    data-bs-toggle="collapse"
                  >
                    <i className="fa-solid fa-cart-shopping me-4 d-none d-lg-block" style={{scale:"1.5"}}></i>
                    <i className="fa-solid fa-cart-shopping me-1  d-lg-none d-sm-block d-xs-block" >&nbsp; C a r t </i>
                  </p>

                  {CartList.length === 0 ? (
                    <></>
                  ) : (
                    <span
                      class="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger"
                    >
                      {CartList.length}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
              </li>
              {/* {AuthHandle.signin() ? ( */}
              {User ? (
                // Render user information if signed in
                <li className="nav-item">
                  <Link
                    className="nav-link  text-uppercase"
                    to="/user-account"
                  >
                    <p
                      className=" m-0"
                      data-bs-target="#navbarNavDropdown"
                      data-bs-toggle="collapse"
                    >
                      <i className="fa-solid fa-circle-user me-1 d-none d-lg-block" style={{scale:"1.5"}}/> 
                      <i className="fa-solid fa-circle-user me-1 d-lg-none d-sm-block d-xs-block" >&nbsp; A c c o u n t </i> 
                    </p>
                  </Link>
                </li>
              ) : (
                // Render login link if not signed in
                <li className="nav-item">
                  <Link className="nav-link  text-uppercase" to="/login">
                    <p
                      className=" m-0"
                      data-bs-target="#navbarNavDropdown"
                      data-bs-toggle="collapse"
                    >
                      <i className="fa-solid fa-circle-user me-1 d-none d-lg-block" style={{scale:"1.5"}}/> 
                      <i className="fa-solid fa-circle-user me-1 d-lg-none d-sm-block d-xs-block" >&nbsp; A c c o u n t </i>
                    </p>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
