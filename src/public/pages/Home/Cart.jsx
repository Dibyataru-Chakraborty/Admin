import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Link } from "react-router-dom";
import ProductsCard from "../../component/layout/Product/ProductsCard";

export default function Cart() {
  const [CartList, setCartList] = useState([]);
  const [TotalPrice, setTotalPrice] = useState();
  const [D_Price, setD_Price] = useState();
  const [OrderPrice, setOrderPrice] = useState();
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const Product = [];
  JSON.parse(sessionStorage.getItem("ProductsData")).forEach((element) => {
    if (element !== null) {
      Product.push({
        ProductBrand: element.ProductBrand,
        imagePreview: element.imagePreview,
        id: element.id,
        ProductStock: element.ProductStock,
        ProductSize: element.ProductSize,
        ProductPrice: element.ProductPrice,
        ProductOfferPrice: element.ProductOfferPrice,
        ProductName: element.ProductName,
        ProductDescription: element.ProductDescription,
        ProductColor: element.ProductColor,
        ProductCategory: element.ProductCategory,
        Quantity: 1,
      });
    }
  });

  const RemoveCart = (id) => {
    const existingCartData = JSON.parse(localStorage.getItem("Cartdata")) || [];

    const updatedCartData = existingCartData.filter((item) => item.id !== id);

    localStorage.setItem("Cartdata", JSON.stringify(updatedCartData));

    message.success("Product Removed", 1.5);
    setCartList(JSON.parse(localStorage.getItem("Cartdata")));
  };

  const EditCart = (id, Quantity) => {
    const existingCartData = JSON.parse(localStorage.getItem("Cartdata")) || [];

    const updatedCartData = existingCartData.map((item) => {
      if (item.id === id) {
        return { ...item, Quantity };
      }
      return item;
    });

    localStorage.setItem("Cartdata", JSON.stringify(updatedCartData));

    message.success("Product Updated", 1.5);
    setCartList(JSON.parse(localStorage.getItem("Cartdata")));
  };

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

  useEffect(() => {
    let cartData = JSON.parse(localStorage.getItem("Cartdata")) || [];

    let totalPrice = calculate(cartData);
    let discountedPrice = calculateDis(cartData);

    setCartList(cartData);
    setTotalPrice(totalPrice);
    setD_Price(discountedPrice);
  }, []);

  return (
    <>
      {/* <!-- cart + summary --> */}
      <section className="bg-light my-3">
        <div className="container">
          <div className="row">
            {/* <!-- cart --> */}
            <div className="col-lg-9">
              <nav aria-label="breadcrumb  p-0">
                <ol className="breadcrumb mx-3">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Products Cart
                  </li>
                </ol>
              </nav>
              <div className="card border shadow"  >
                <div className="m-4">
                  <h4 className="card-title mb-4">Your shopping cart</h4>

                  {CartList.map((i) => (
                    <div className="row gy-3 mb-4">
                      <div className="col-lg-5">
                        <div className="me-lg-5" id={i.id} key={i.id}>
                          <div className="d-flex">
                            <img
                              src={i.imagePreview}
                              className="border rounded me-3"
                              style={{ width: " 96px", height: " 120px" }}
                              alt={i.ProductDescription}
                            />
                            <div className="">
                              <Link
                                to={`/product/${i.Productid}`}
                                className="nav-link"
                              >
                                {i.ProductName} ({i.ProductSize})
                              </Link>
                              <p className="text-muted">
                                {i.ProductColor} ,{i.ProductCategory}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div className="">
                          <select
                            style={{ width: " 100px" }}
                            id={i.id}
                            className="form-select me-4"
                            value={i.Quantity}
                            onChange={(e) => {
                              EditCart(e.target.id, e.target.value);
                            }}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                        <div className="">
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
                      <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div className="float-md-end">
                          {/* <a
                            href="#!"
                            className="btn btn-light border px-2 icon-hover-primary"
                          >
                            <i className="fas fa-heart fa-lg px-1 text-secondary"></i>
                          </a> */}
                          <a
                            id={i.id}
                            href={`#!Remove${Math.floor(Math.random() * 99999999)}`}
                            onClick={(e) => {
                              RemoveCart(e.target.id);
                            }}
                            className="btn btn-light border  btn-outline-danger"
                          >
                            {" "}
                            Remove
                          </a>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- cart -->
            <!-- summary --> */}
            <div className="col-lg-3">
              <div className="card mb-3 border shadow">
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Have coupon?</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control border"
                        name=""
                        placeholder="Coupon code"
                        disabled
                      />
                      <button className="btn btn-light border">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow border">
                <div className="card-body">
                  <div className="d-flex justify-content-between ">
                    <p className="mb-2"> Price:</p>
                    <p className="mb-2 mt-0">₹ {calculate(CartList)}.00</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount:</p>
                    <p className="mb-2 text-success mt-0">
                      -₹ {Number(calculate(CartList) - calculateDis(CartList))}
                      .00
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2 ">
                      Delivery : <i className="fas fa-shipping-fast"></i>
                    </p>
                    <p className="mb-2 text-success mt-0">
                      <del className="mb-2 mt-0">₹ 100.00</del> (Free)
                    </p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2 fw-bold mt-0">
                      ₹ {calculateDis(CartList)}.00
                    </p>
                  </div>

                  <div className="mt-3">
                    {User ? (
                      <Link to="/order">
                        <button
                          href="#"
                          className="btn btn-success w-100 shadow-0 mb-2"
                        >
                          {" "}
                          Make Purchase{" "}
                        </button>
                      </Link>
                    ) : (
                      <Link to="/login">
                        <button
                          href="#"
                          className="btn btn-danger w-100 shadow-0 mb-2"
                        >
                          {" "}
                          Please Login{" "}
                        </button>
                      </Link>
                    )}

                    <Link to="/" className="btn btn-light w-100 border mt-2">
                      {" "}
                      Back to shop{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- summary --> */}
          </div>
        </div>
      </section>
      {/* <!-- cart + summary --> */}
      <section>
        <div className="container my-5">
          <header className="mb-4">
            <div className="d-flex mb-3">
              <h3>Recommended items</h3>
              <div className="ms-auto p-2">
                <Link></Link>
                <Link
                  to="/products"
                  type="button"
                  className="btn btn-success btn-sm"
                >
                  view All <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </header>

          <div className="row">
            <ProductsCard Product={Product.slice(0, 4)} />
          </div>
        </div>
      </section>
      {/* <!-- Recommended --> */}
    </>
  );
}
