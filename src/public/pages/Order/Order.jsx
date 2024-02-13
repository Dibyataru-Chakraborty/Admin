import { push, ref, set } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../Utils/Firebase/Firebase_config";
import { Result, message } from "antd";

function Order(props) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const [CartList, setCartList] = useState([]);
  const [TotalPrice, setTotalPrice] = useState();
  const [D_Price, setD_Price] = useState();
  const [OrderPrice, setOrderPrice] = useState();
  const [UserAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("UserDeliveryInfo"))
  );
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  function calculate(items) {
    let totalprice = 0;
    items.forEach((item) => {
      totalprice += item.ProductPrice * item.Quantity;
    });
    return totalprice;
  }
  function calculateDis(items) {
    let totalprice = 0;
    items.forEach((item) => {
      totalprice += item.ProductOfferPrice * item.Quantity;
    });
    return totalprice;
  }
  const [Purchesed, setPurchesed] = useState(false);
  const onPlaceOrder = async () => {
    const uid = JSON.parse(localStorage.getItem("user"));
    const Ordered = {
      CartList,
      UserAddress,
      DeliveryInfo: "n",
      ShippingInfo: "n",
      Paid: "n",
      orderdate:formattedDate,
      ordertime:formattedTime
    };
    await push(ref(db, "Ordered/"), Ordered).then(async (e) => {
      const key = e.key;
      await set(ref(db, `Users/${uid}/Ordered/${key}`), Ordered).then(() => {
        message.success("Successfully Ordered");
        localStorage.removeItem("Cartdata");
        setPurchesed(true);
      });
    });
  };

  useEffect(() => {
    let cartData = JSON.parse(localStorage.getItem("Cartdata")) || [];
    if (!UserAddress) {
      navigate("/user-account/user-address");
    }
    if (!User) {
      navigate("/login");
    }
    let totalPrice = calculate(cartData, "price");
    let discountedPrice = calculate(cartData, "D_price");
    setCartList(cartData);
    setTotalPrice(totalPrice);
    setD_Price(discountedPrice);
  }, [User, UserAddress, navigate]);

  if (!User) {
    navigate("/login");
  }
  return (
    <>
      {!Purchesed ? (
        <div className="container my-3">
          <h1 className="h3 mb-2">Address</h1>
          <hr style={{ borderColor: "black" }} />
          <div className="row">
            {/* Left */}
            <div className="col-lg-9">
              <div className="accordion" id="accordionPayment">
                {/* Address */}
                {!UserAddress ? (
                  <h2>address</h2>
                ) : (
                  <div className="accordion-item mb-3 mt-2 border rounded-4 shadow">
                    <h2 className="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
                      <div
                        className="form-check w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePP"
                        aria-expanded="false"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="address"
                          id="address_user"
                          checked
                        />
                        <label className="form-check-label pt-1">
                          {UserAddress.name}, {UserAddress.address1}....
                        </label>
                      </div>
                      <span>
                        <img
                          src="map.gif"
                          style={{ width: "40px", height: "40px" }}
                          alt=""
                        />
                      </span>
                    </h2>
                    <div
                      id="collapsePP"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionPayment"
                      style={{}}
                    >
                      <div className="accordion-body">
                        <div className="px-2 col-lg- mb-3">
                          <ul class="list-unstyled mb0">
                            <li>
                              <strong>Name:</strong> {UserAddress.name}({" "}
                              {UserAddress.email} )
                            </li>
                            <li>
                              <strong>Address:</strong> {UserAddress.address1},
                              {UserAddress.city},{UserAddress.state},
                              {UserAddress.zip}
                            </li>
                            <li>
                              <strong>Phone no : </strong>(+91){" "}
                              {UserAddress.telephone}
                            </li>
                            <li>
                              <strong>Country :</strong> {UserAddress.country}
                            </li>
                            <li>
                              <strong>Landmark:</strong>{" "}
                              {UserAddress.DeliveryInfo}
                            </li>
                          </ul>
                        </div>
                        <Link to="/user-account/user-address">
                          <button
                            type="button"
                            class="btn btn-success btn-rounded"
                          >
                            Edit Address
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                {/* Product cart */}
                <hr style={{ borderColor: "black" }} />
                <div className="">
                  <div className="card border shadow">
                    <div className="m-4">
                      <h4 className="card-title mb-4">Your Pruduct Summary</h4>
                      {CartList.map((i) => (
                        <div className="row gy-3 mb-4">
                          <div className="col-lg-5">
                            <div className="me-lg-5" id={i.id} key={i.id}>
                              <div className="d-flex">
                                <img
                                  src={i.imagePreview}
                                  className="border rounded me-3"
                                  style={{ width: " 96px", height: " 120px" }}
                                />
                                <div className="">
                                  <a href="#" className="nav-link">
                                    {i.ProductName} ({i.ProductSize})
                                  </a>
                                  <p className="text-muted">
                                    {i.ProductColor} ,{i.ProductCategory}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row  flex-lg-column flex-xl-row text-nowrap">
                            <div className="">
                              <select
                                style={{ width: " 100px" }}
                                id={i.id}
                                className="form-select me-4"
                                value={i.Quantity}
                                onChange={(e) => {}}
                              >
                                <option>{i.Quantity}</option>
                              </select>
                            </div>
                            <div className="ms-5">
                              <text className="h6">
                                ₹ {i.ProductOfferPrice * i.Quantity}.00
                              </text>{" "}
                              <br />
                              <small className="text-muted text-nowrap">
                                {" "}
                                ₹ {i.ProductOfferPrice}.00 / per item{" "}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-top pt-4 mx-4 mb-4">
                      <p>
                        <i className="fas fa-truck text-muted fa-lg"></i> Free
                        Delivery within 1-2 weeks
                      </p>
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip
                      </p>
                    </div>
                  </div>
                </div>
                {/* PayPal */}
                <div className="accordion-item mb-3 mt-2 border rounded-4 shadow">
                  <h2 className="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
                    <div
                      className="form-check w-100 collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePP"
                      aria-expanded="false"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="payment2"
                        checked
                      />
                      <label className="form-check-label pt-1">
                        Pay on Delivery
                      </label>
                    </div>
                    <span>
                      <img
                        src="paymentSVG.gif"
                        style={{ width: "103", height: "25" }}
                        alt=""
                      />
                    </span>
                  </h2>
                  <div
                    id="collapsePP"
                    className="accordion-collapse collapse "
                    data-bs-parent="#accordionPayment"
                    style={{}}
                  >
                    <div className="accordion-body">
                      <div className="px-2 col-lg- mb-3">
                        <label className="form-label">
                          Pay on Delivery (POD) includes Cash on Delivery (COD)
                          as well as additional digital payment facilities via
                          UPI/QR Code -Scan & Pay.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="col-lg-3">
              <div className="card position-sticky top-0 shadow">
                <div className="p-3 bg-light bg-opacity-10 ">
                  <h6 className="card-title mb-3">Order Summary</h6>
                  <div className="d-flex justify-content-between mb-1 small">
                    <span>Subtotal : </span>{" "}
                    <span>₹ {calculate(CartList)}.00</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1 small">
                    <span>Discount : </span>{" "}
                    <span className="text-danger">
                      -₹ {Number(calculateDis(CartList) - calculate(CartList))}
                      .00
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-1 small">
                    <span>
                      Shipping <i class="fas fa-shipping-fast"></i> :{" "}
                    </span>{" "}
                    <span>
                      <p className="mb-2 text-success mt-0">
                        <del className="mb-2 mt-0">₹ 100.00</del> (Free)
                      </p>
                    </span>
                  </div>
                  <hr style={{ borderColor: "black" }} />
                  <div className="d-flex justify-content-between mb-4 small">
                    <span>TOTAL</span>{" "}
                    <strong className="text-dark">
                      ₹ {calculateDis(CartList)}.00
                    </strong>
                  </div>
                  <div className="form-check mb-1 small">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="tnc"
                      defaultChecked
                    />
                    <label className="form-check-label">
                      I agree to the <a href="#">terms and conditions</a>
                    </label>
                  </div>
                  <div className="form-check mb-3 small">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="subscribe"
                      defaultChecked
                    />
                    <label className="form-check-label">
                      Get emails about product updates and events. If you change
                      your mind, you can unsubscribe at any time.{" "}
                      <a href="#">Privacy Policy</a>
                    </label>
                  </div>
                  <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={(e) => {
                      onPlaceOrder();
                    }}
                  >
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Result
          status="success"
          title="Successfully Purchased!"
          subTitle="Order Placed Successfully."
          extra={[
            <Link to={"/"}>
              <button type="button" className="btn btn-warning">
                Home
              </button>
            </Link>,
            <Link to={"/products"}>
              <button type="button" className="btn btn-success">
                Buy Again
              </button>
            </Link>,
          ]}
        />
      )}
    </>
  );
}

export default Order;
