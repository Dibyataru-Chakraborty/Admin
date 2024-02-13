import React from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
function UserAddress(props) {
    const navigate = useNavigate();
    const DeliveryInfo=(e)=>{
        e.preventDefault()
        let address={
            name:e.target.name.value,
            email:e.target.email.value,
            address1:e.target.address1.value,
            address2:e.target.address2.value,
            city:e.target.city.value,
            state:e.target.state.value,
            zip:e.target.zip.value,
            country:e.target.country.value,
            telephone:e.target.telephone.value,
            DeliveryInfo:e.target.message.value,
        }
        localStorage.setItem("UserDeliveryInfo", JSON.stringify(address));
        message.success("Address Saved", 1.5);
        navigate("/order")
    }
  return (
    <div className="container mt-3" >
      <div className="row mx-0 justify-content-center" >
        <div className="col-md-10 col-lg-12 px-lg-2 col-xl-10 px-xl-0 px-xxl-3" style={{boxShadow: "rgba(0, 0, 0, 0.15) 3.95px 3.95px 5.6px"}}>
          <form  className="w-100 rounded-1 p-4 border bg-white" onSubmit={e=>{DeliveryInfo(e)}}>
            <h1 className="h3 mb-2"> Delivery Address info</h1>
            <hr style={{ borderColor: "black" }} />
            <label className="d-block mb-4">
              <span className="form-label d-block">Your name</span>
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Your Name"
                required
              />
            </label>
            <label className="d-block mb-4">
              <span className="form-label d-block">Email Address</span>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email Address"
                required
              />
            </label>
            <label className="d-block mb-4">
              <span className="form-label d-block"> Primary Address </span>
              <input
                name="address1"
                type="text"
                className="form-control"
                placeholder="Primary Address "
                required
              />
            </label>
            <label className="d-block mb-4">
              <span className="form-label d-block"> Secondary Address </span>
              <input
                name="address2"
                type="text"
                className="form-control"
                placeholder="Secondary Address"
              />
            </label>
            <div className="container d-flex justify-content-between flex-wrap">
              <label className="d-block mb-4">
                <span className="form-label d-block">City</span>
                <input
                  name="city"
                  type="text"
                  className="form-control"
                  placeholder="City"
                  required
                />
              </label>
              <label className="d-block mb-4">
                <span className="form-label d-block">State/Province</span>
                <input
                  name="state"
                  type="text"
                  className="form-control"
                  placeholder="State"
                  required
                />
              </label>
              <label className="d-block mb-4">
                <span className="form-label d-block">Zip/Postal code</span>
                <input
                  name="zip"
                  type="text"
                  className="form-control"
                  placeholder="Zip code"
                  required
                />
              </label>
            </div>

            <label className="d-block mb-4">
              <span className="form-label d-block">Country</span>
              <input
                name="country"
                type="text"
                className="form-control"
                placeholder="Country"
                required
              />
            </label>
            <label className="d-block mb-4">
              <span className="form-label d-block">Telephone Numder</span>
              <input
                name="telephone"
                type="number"
                className="form-control"
                placeholder="Telephone Numder"
                required
              />
            </label>
            <label className="d-block mb-4">
              <span className="form-label d-block">Delivery information</span>
              <textarea
                name="message"
                className="form-control"
                rows={3}
                placeholder="House no. / floor / landmark/etc."
                defaultValue={""}
                required
              />
            </label>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button  type="submit" className="btn btn-success  shadow-lg mb-2" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                {" "}
                Save Details{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserAddress;
