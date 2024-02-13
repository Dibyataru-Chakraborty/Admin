import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../../../Utils/Firebase/Firebase_config";

function UserAccount(props) {
  const [UserAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("UserDeliveryInfo"))
  );

  const [OrderHistoryData, setOrderHistoryData] = useState([]);
  const OrderHistory = () => {
    const uid = JSON.parse(localStorage.getItem("user"));
    onValue(ref(db, `Users/${uid}/Ordered/`), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setOrderHistoryData([]);
      } else {
        // Convert the object into an array of customer objects
        const productArray = Object.keys(data).map((productId) => ({
          id: productId,
          ...data[productId],
        }));

        // Update the state with the array of customer objects
        setOrderHistoryData(productArray);
      }
    });
  };

  const uid = JSON.parse(localStorage.getItem("user"));
  const [User, setUser] = useState({
    Email:"",
    UserName:""
  })

  const UserData = () =>{
    onValue(ref(db, `Users/${uid}`), (snapshot) => {
      setUser({
        Email:snapshot.val().Email,
        UserName:snapshot.val().Username
      })
      console.log(snapshot.val());
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([OrderHistory(),UserData()]);
    };
    fetchData();
  }, []);

  console.log(OrderHistoryData);

  return (
    <div className="container">
      <div className="row gutters mt-3">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mb-2">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile d-flex flex-column justify-content-center align-items-center">
                  <div className="user-avatar mt-3 d-flex flex-column justify-content-center">
                    <img
                      src="https://calcutta16.com/web_logo_br.png"
                      alt="Maxwell Admin"
                      className="rounded-circle shadow-4 mx-auto w-50"
                    />
                  </div>
                  <h5 className="user-name h3 font-weight-bold m-1">
                    {User.UserName}
                  </h5>
                  <h6 className="user-email m-0">{User.Email}</h6>
                </div>
                <div className="about d-flex flex-column justify-content-center align-items-center">
                  <h5 className="h4 my-3 text-primary">About</h5>
                  <p className="m-0 text-center">
                    I'm Yuki. Full Stack Designer I enjoy creating user-centric,
                    delightful and human experiences.
                  </p>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto mt-3">
                  <button class="btn btn-primary" type="button">
                    Log Out<i class="fa-solid fa-right-from-bracket me-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          
        </div> */}
        <div className="col-xl-9 col-lg-9 col-md-12 col-mt-0 col-sm-12 col-12  ">
          {!UserAddress ? (
            <div className="card mb-3">
              <div className="card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(e.target.fullName.value);
                  }}
                >
                  <div className="row gutters ">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2  h5 text-primary ">
                        Personal Details
                      </h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 ">
                      <div className="form-group ">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                          required
                          type="text"
                          className="form-control my-2"
                          id="fullName"
                          placeholder="Enter full name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="eMail">Email</label>
                        <input
                          required
                          type="email"
                          className="form-control my-2"
                          id="eMail"
                          placeholder="Enter email ID"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          required
                          type="text"
                          className="form-control my-2"
                          id="phone"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="website">Website URL</label>
                        <input
                          required
                          type="text  "
                          className="form-control my-2"
                          id="website"
                          placeholder="Website url"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mt-3 mb-2 h5 text-primary">Address</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="Street">Street</label>
                        <input
                          required
                          type="name"
                          className="form-control my-2"
                          id="Street"
                          placeholder="Enter Street"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="ciTy">City</label>
                        <input
                          required
                          type="name"
                          className="form-control my-2"
                          id="ciTy"
                          placeholder="Enter City"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="sTate">State</label>
                        <input
                          required
                          type="text"
                          className="form-control my-2"
                          id="sTate"
                          placeholder="Enter State"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="zIp">Zip Code</label>
                        <input
                          required
                          type="text"
                          className="form-control my-2"
                          id="zIp"
                          placeholder="Zip Code"
                        />
                      </div>
                    </div>
                    <div className=" col-12">
                      <div className="form-group">
                        <label className="d-block mb-4">
                          <span className="form-label d-block">
                            Delivery information
                          </span>
                          <textarea
                            name="message"
                            className="form-control"
                            rows={3}
                            placeholder="House no. / floor / landmark/etc."
                            defaultValue={""}
                            required
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="text-right">
                        <button
                          type="submit"
                          id="submit"
                          name="submit"
                          className="btn btn-primary"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="accordion-item mb-3 mt-2 border rounded-4">
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
                  <div className="accordion-body mx-3 mb-3">
                    <div className="px-3 col-lg-  ">
                      <ul class="list-unstyled mb0">
                        <li>
                          <strong>Name : </strong>
                          {UserAddress.name} ( {UserAddress.email} )
                        </li>
                        <li>
                          <strong>Address : </strong>
                          {UserAddress.address1},{UserAddress.city},
                          {UserAddress.state},{UserAddress.zip}
                        </li>
                        <li>
                          <strong>Phone no : </strong>
                          (+91) {UserAddress.telephone}
                        </li>
                        <li>
                          <strong>Country : </strong>
                          {UserAddress.country}
                        </li>
                        <li>
                          <strong>Landmark : </strong>{" "}
                          {UserAddress.DeliveryInfo}
                        </li>
                      </ul>
                    </div>
                    <Link to="/user-account/user-address">
                      <button type="button" class="btn btn-success btn-rounded">
                        Edit Address
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
          <section
            className=""
            style={{ backgroundColor: "#fff", borderRadius: 15 }}
          >
            <div className="container pt-3 card ">
              <div className="row d-flex justify-content-center  ">
                <div className="col col-xl-12">
                  {OrderHistoryData.length <= 0 ? (
                    <div class="d-flex align-items-center">
                      <h4 className="card-title h3 mb-4 mx-3">Your Order</h4>
                      <div
                        class="spinner-border ms-auto"
                        aria-hidden="true"
                      ></div>
                    </div>
                  ) : (
                    <>
                      <h4 className="card-title h3 mb-4 mx-3">Your Order</h4>
                    </>
                  )}
                  {OrderHistoryData.length >= 0 ? (
                    <>
                      {OrderHistoryData.slice(0)
                        .reverse()
                        .map((i) => (
                          <div
                            className="card mb-2"
                            style={{ borderRadius: 15 }}
                          >
                            <div className="card-body p-3">
                              <Link to={`/user-account/order/${i.id}`}>
                                <h3 className="mb-3">
                                  #{i.id.slice(1, 10)}...
                                </h3>
                              </Link>
                              <p className="small mb-3">
                                <i className="fas fa-star fa-lg text-warning" />{" "}
                                <span className="mx-2">|</span>
                                <span class="badge text-bg-success">
                                  Processing
                                </span>{" "}
                                <span className="mx-2">|</span> Updated by{" "}
                                <strong>Calcutta 16</strong> on 11 April , 2021
                              </p>
                              <div className="d-flex justify-content-start align-items-center flex-wrap ">
                                <p className="mb-0 text-uppercase">
                                  <Link to={`/user-account/order/${i.id}`}>
                                    <i className="fas fa-ellipsis-h ms-4 me-2" />{" "}
                                    <span className="text-muted small">
                                      {" "}
                                      link
                                    </span>
                                    <span className="ms-3 me-4">|</span>
                                  </Link>
                                </p>
                                {i.CartList.map((e) => (
                                  <Link to={`/product/${e.Productid}`}>
                                    <img
                                      src={e.imagePreview[0]}
                                      alt="avatar"
                                      className="img-fluid rounded-circle me-1"
                                      width={50}
                                    />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className="card" style={{ borderRadius: 15 }}>
                      <div className="card-body p-4">
                        <h3 className="h3">No Order</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
