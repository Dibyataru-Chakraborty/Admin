import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../public/component/layout/Loader/Loader";
import { onValue, ref } from "firebase/database";
import { db } from "../../Utils/Firebase/Firebase_config";
function AdminOrderEdit(props) {
  const { id } = useParams();

  const [OrderData, setOrderData] = useState();
  const Orders = () => {
    onValue(ref(db, `Ordered/${id}`), (snapshot) => {
      const data = snapshot.val();
      setOrderData(data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([Orders()]);
    };
    fetchData();
  }, []);

  let ProductList = [1, 2, 3];

//   const [OrderHistory, setOrderHistory] = useState(
//     JSON.parse(sessionStorage.getItem("OrderHistory")) || []
//   );

//   const [OrderIdData, setOrderIdData] = useState();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const ordertMatch = OrderHistory.find((i) => i.id === id);
//     if (ordertMatch) {
//       setOrderIdData(ordertMatch);
//       console.log(OrderIdData);
//     }
//   }, [OrderHistory]);
//   if (OrderHistory.length === 0) {
//     return <Loader />;
//   }


  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-xl-8">
          
            <>
              {ProductList.map((i) => (
                <div className="card border shadow-none mb-3">
                  <div className="card-body">
                    <div className="d-flex align-items-start border-bottom pb-3">
                      <div className="me-4">
                        <img
                          src="/ko16.jpeg"
                          alt=""
                          className="rounded me-3"
                          style={{ width: " 100px" }}
                        />
                      </div>
                      <div className="flex-grow-1 align-self-center overflow-hidden">
                        <div>
                          <Link>
                            <h5 className="text-truncate h5 ">
                              {"Product Name"}{" "}
                            </h5>
                          </Link>
                          <p className="text-warning m-0">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                          </p>
                          <p className="mb-0 mt-1">
                            Color : <span className="fw-medium">Gray</span>
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
                                  ₹ 500
                                </del>
                              </span>
                              ₹ 450.00
                            </h5>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mt-3">
                            <p className="text-muted h5 mb-2">Quantity :</p>
                            <h5 className="mb-0 mt-2">2</h5>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mt-3">
                            <p className="text-dark h5 mb-2">Price :</p>
                            <h5 className="mb-0 mt-2">₹ 1000.00</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          <div className="row my-4">
            <div className="col-sm-6">
              <Link href="#" className="btn btn-link text-muted">
                <i class="fa-solid fa-arrow-left"></i> Continue Shopping{" "}
              </Link>
            </div>{" "}
            {/* end col */}
            <div className="col-sm-6">
              <div className="text-sm-end mt-2 mx-3 mt-sm-0">
                <button
                  
                  className="btn btn-success me-1"
                >
                  <i className="mdi mdi-cart-outline me-1" /> Order Status Chenge{" "}
                </button>
                <button
                  
                  className="btn btn-danger"
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
                  Order Summary <span className="float-end">#MN0124</span>
                </h5>
              </div>
              <div className="card-body p-4 pt-2">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <td>Sub Total :</td>
                        <td className="text-end">₹ 780</td>
                      </tr>
                      <tr>
                        <td>Discount : </td>
                        <td className="text-end">- ₹ 78</td>
                      </tr>
                      <tr>
                        <td>Shipping Charge :</td>
                        <td className="text-end">₹ 25</td>
                      </tr>
                      <tr>
                        <td>Estimated Tax : </td>
                        <td className="text-end">₹ 18.20</td>
                      </tr>
                      <tr className="bg-light">
                        <th>Total :</th>
                        <td className="text-end">
                          <span className="fw-bold">₹ 745.2</span>
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
    </div>
  );
}

export default AdminOrderEdit;
