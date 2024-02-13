import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../component/layout/Loader/Loader";
import { onValue, ref, update } from "firebase/database";
import { db } from "../../../Utils/Firebase/Firebase_config";
import OrderTrack from "../../component/layout/Order/OrderTrack";
import { Result, message } from "antd";
function OrderD(props) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const { id } = useParams();
  const [OrderIdData, setOrderIdData] = useState([]);

  const OrderHistory = () => {
    const uid = JSON.parse(localStorage.getItem("user"));
    onValue(ref(db, `Users/${uid}/Ordered/`), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setOrderIdData();
      } else {
        // Convert the object into an array of customer objects
        const productArray = Object.keys(data).map((productId) => ({
          id: productId,
          ...data[productId],
        }));
        productArray.map((e) => {
          if (id === e.id) {
            console.log(e);
            setOrderIdData(e);
          }
        });
        // Update the state with the array of customer objects
      }
    });
  };
  // calculate function
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
  const navigate = useNavigate();
  const [Purchesed, setPurchesed] = useState(false);
  const handleCancel = async () =>{
    const uid = JSON.parse(localStorage.getItem("user"));
    const Ordered = {
      DeliveryInfo: "c",
      ShippingInfo: "c",
      Paid: "n",
      canceldate:formattedDate,
      canceltime:formattedTime
    };
    await update(ref(db, `Ordered/${id}`),Ordered).then(()=>{
      update(ref(db, `Users/${uid}/Ordered/${id}`),Ordered).then(() => {
        message.success("Order Canceled");
        setPurchesed(true);
        setTimeout(() => {
          navigate("/")
        }, 3000);
      });
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      await Promise.all([OrderHistory()]);
    };
    fetchData();
  }, []);

  if (OrderIdData.length === 0) {
    return <Loader />;
  }

  return (
    <>
    {!Purchesed ? (
    <div className="container mt-3">
      <div className="row">
        <div className="col-xl-8">
        <nav aria-label="breadcrumb  p-0">
                <ol className="breadcrumb mx-3">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/user-account">User Account</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Order
                  </li>
                </ol>
              </nav>
          <OrderTrack />
          <div className="invoice-details  border rounded">
            <div className="well">
              <ul className="list-unstyled ps-3 pt-2">
                <li>
                  <strong>Invoice</strong> #936988
                </li>
                <li>
                  <strong>Invoice Date:</strong> Monday, October 10th, 2015
                </li>
                <li>
                  <strong>Due Date:</strong> Thursday, December 1th, 2015
                </li>
                <li>
                  <strong>Status:</strong>{" "}
                  <span className="badge text-bg-danger rounded-pill py-2">Processing</span>
                </li>
              </ul>
            </div>
          </div>
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
                  {OrderIdData.UserAddress.name},{" "}
                  {OrderIdData.UserAddress.address1}....
                </label>
              </div>
              <span>
                <img
                  src="/map.gif"
                  style={{ width: "40px", height: "40px" }}
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
                <div className="ps-4 col-lg- mb-3">
                  <ul class="list-unstyled mb0">
                    <li>
                      <strong>Name:</strong> {OrderIdData.UserAddress.name} (
                      {OrderIdData.UserAddress.email})
                    </li>
                    <li>
                      <strong>Address:</strong>{" "}
                      {OrderIdData.UserAddress.address1},
                      {OrderIdData.UserAddress.city},
                      {OrderIdData.UserAddress.state},
                      {OrderIdData.UserAddress.zip}
                    </li>
                    <li>
                      <strong>Phone no : </strong>(+91){" "}
                      {OrderIdData.UserAddress.telephone}
                    </li>
                    <li>
                      <strong>Country :</strong>{" "}
                      {OrderIdData.UserAddress.country}
                    </li>
                    <li>
                      <strong>Landmark:</strong>{" "}
                      {OrderIdData.UserAddress.DeliveryInfo}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {OrderIdData.CartList.map((i) => (
            <div className="card border shadow-none mb-3">
              <div className="card-body">
                <div className="d-flex align-items-start border-bottom pb-3">
                  <div className="me-4">
                    <img
                      src={i.imagePreview[0]}
                      alt=""
                      className="rounded me-3"
                      style={{ width: " 100px" }}
                    />
                  </div>
                  <div className="flex-grow-1 align-self-center overflow-hidden">
                    <div>
                      <Link to={`/product/${i.id}`}>
                        <h5 className="text-truncate h5 ">{i.ProductName} </h5>
                      </Link>
                      <p className="text-warning m-0">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </p>
                      <p className="mb-0 mt-1">
                        Color :{" "}
                        <span className="fw-medium">{i.ProductColor}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ms-2">
                    <ul className="list-inline mb-0 font-size-16">
                      <li className="list-inline-item">
                        <a href="#" className="text-muted px-1">
                          <i class="fa-regular fa-trash-can"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <Link href="#" className="text-muted px-1">
                          <i class="fa-solid fa-heart-circle-plus"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mt-3">
                        <p className="text-muted mb-2">Price :</p>
                        <h5 className="mb-0 mt-2">
                          <span className="text-muted me-2">
                            <del className="font-size-16 fw-normal">
                              ₹ {i.ProductPrice}
                            </del>
                          </span>
                          ₹ {i.ProductOfferPrice}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mt-3">
                        <p className="text-muted h5 mb-2">Quantity :</p>
                        <h5 className="mb-0 mt-2">{i.Quantity}</h5>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mt-3">
                        <p className="text-dark h5 mb-2"> Total Price :</p>
                        <h5 className="mb-0 h5 mt-2">
                          ₹ {Number(i.ProductOfferPrice * i.Quantity)}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row my-4">
            <div className="col-sm-6">
              <Link to="/" className="btn btn-link text-muted">
                <i class="fa-solid fa-arrow-left"></i> Continue Shopping{" "}
              </Link>
            </div>{" "}
            {/* end col */}
            <div className="col-sm-6">
              <div className="text-sm-end mt-2 mx-3 mt-sm-0">
                <button
                  href="ecommerce-checkout.html"
                  className="btn btn-success"
                  onClick={handleCancel}
                >
                  <i className="mdi mdi-cart-outline me-1" /> Order Cancel{" "}
                </button>
              </div>
            </div>{" "}
            {/* end col */}
          </div>{" "}
          {/* end row*/}
        </div>
        <div className="col-xl-4">
          <div className="mt-5 mt-lg-0">
            <div className="card border shadow-none">
              <div className="card-header bg-transparent border-bottom py-3 px-4">
                <h5 className="font-size-16 mb-0">
                  Order Summary{" "}
                  <span className="float-end">
                    #{OrderIdData.id.slice(1, 9)}...
                  </span>
                </h5>
              </div>
              <div className="card-body p-4 pt-2">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <td>Sub Total :</td>
                        <td className="text-end">
                          ₹ {calculate(OrderIdData.CartList)}.00
                        </td>
                      </tr>
                      <tr>
                        <td>Discount : </td>
                        <td className="text-end text-success">
                          - ₹{" "}
                          {Number(
                            calculate(OrderIdData.CartList) -
                              calculateDis(OrderIdData.CartList)
                          )}.00
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Shipping Charge :
                          <i className="fas fa-shipping-fast"></i>
                        </td>
                        <td className="text-end text-success">
                          <del className="mb-2 mt-0">₹ 100.00</del> (Free)
                        </td>
                      </tr>
                      <tr className="bg-light">
                        <th>Total Price :</th>
                        <td className="text-end">
                          <span className="fw-bold h5">
                            ₹ {calculateDis(OrderIdData.CartList)}.00
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}
    </div>):(
      <Result
      status="error"
      title="Successfully Cancelled!"
      subTitle="Order Cancelled Successfully."
      // extra={[
      //   <Link to={"/"}>
      //     <button type="button" className="btn btn-warning">
      //       Home
      //     </button>
      //   </Link>,
      //   <Link to={"/products"}>
      //     <button type="button" className="btn btn-success">
      //       Buy Again
      //     </button>
      //   </Link>,
      // ]}
    />
    )}
    </>
  );
}

export default OrderD;
