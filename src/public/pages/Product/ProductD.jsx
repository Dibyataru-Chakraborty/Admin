import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductsCard from "../../component/layout/Product/ProductsCard";
import Loader from "../../component/layout/Loader/Loader";
import { message } from "antd";
const ProductD = () => {
  const [DisplayImg, setDisplayImg] = useState();
  const navigate = useNavigate();
  const [ProductSize, setProductSize] = useState("");
  const { id } = useParams();
  const [counter, setCounter] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Product = [];
  JSON.parse(sessionStorage.getItem("ProductsData")).forEach((element) => {
    if (element !== null) {
      Product.push({
        ProductBrand: element.ProductBrand,
        imagePreview: element.imagePreview,
        Productid: element.id,
        ProductStock: element.ProductStock,
        ProductSize: element.ProductSize,
        ProductPrice: element.ProductPrice,
        ProductOfferPrice: element.ProductOfferPrice,
        ProductName: element.ProductName,
        ProductDescription: element.ProductDescription,
        ProductColor: element.ProductColor,
        ProductCategory: element.ProductCategory,
        Quantity: counter,
      });
    }
  });
  var Productd = "";

  if (Product.length >= 0) {
    const productMatch = Product.find((i) => i.Productid === id);
    if (productMatch) {
      Productd = productMatch;
    }
  }

  // setDisplayImg(productMatch.imagePreview[0]); ami chng korle onk kichu delete kore chng kortm tui kore ne

  let incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }
  if (counter >= 5) {
    incrementCounter = () => setCounter(5);
  }

  const CartAdd = (e) => {
    const existingCartData = JSON.parse(localStorage.getItem("Cartdata")) || [];
    const isItemInCart = existingCartData.some(
      (item) =>
        item.Productid === e.Productid && item.ProductSize === ProductSize
    );

    if (!isItemInCart) {
      const id = (existingCartData.length + 1).toString();
      e.id = id;

      e.ProductSize = ProductSize;
      const updatedCartData = [...existingCartData, e];
      console.log(updatedCartData);
      localStorage.setItem("Cartdata", JSON.stringify(updatedCartData));

      message.success("Added to cart");
    }
  };

  return (
    <>
      {!Productd ? (
        <Loader></Loader>
      ) : (
        <>
          <section className="py-3">
            <div className="container">
            <nav aria-label="breadcrumb  p-0">
                <ol className="breadcrumb mx-3">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/products">Products</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Product
                  </li>
                </ol>
              </nav>
              <div className="row gx-4">
                <aside className="col-lg-6">
                  <div className="border rounded-4 mb-3 d-flex justify-content-center">
                    <div
                      data-fslightbox="mygalley"
                      className="rounded-4"
                      target="_blank"
                      data-type="image"
                      href="#"
                    >
                      {!DisplayImg ? (
                        <img
                          style={{
                            maxWidth: " 100%",
                            maxHeight: "100vh",
                            margin: "auto;",
                          }}
                          className="rounded-4 fit"
                          src={Productd.imagePreview[0]}
                          alt="Pname"
                        />
                      ) : (
                        <img
                          style={{
                            maxWidth: " 100%",
                            maxHeight: "100vh",
                            margin: "auto;",
                          }}
                          className="rounded-4 fit"
                          src={DisplayImg}
                          alt="Pname"
                        />
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    {Productd.imagePreview.map((i) => (
                      <div
                        data-fslightbox="mygalley"
                        className="border mx-1 rounded-2 item-thumb"
                        target="_blank"
                        data-type="image"
                        onClick={(e) => {
                          window.scrollTo(0, 0);
                          setDisplayImg(e.target.src);
                        }}
                      >
                        <img
                          width="60"
                          height="60"
                          className="rounded-2"
                          src={i}
                          alt="Pname"
                        />
                      </div>
                    ))}
                  </div>
                  {/* <!-- thumbs-wrap.// -->
        <!-- gallery-wrap .end// --> */}
                </aside>
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title text-dark">{Productd.ProductName}</h4>
                    <div className="d-flex flex-row my-3">
                      <div className="text-warning mb-1 me-2">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <span className="ms-1">4.5</span>
                      </div>
                      <span className="text-muted">
                        <i className="fa-solid fa-bag-shopping mx-1"></i>154
                        orders
                      </span>
                      <span className="text-success ms-2">In stock</span>
                    </div>
                    <div className="mb-3">
                      <span className="h5">
                        ₹ {Productd.ProductOfferPrice}.00
                      </span>
                      <span className="text-muted"> / each </span>
                      <del className="text-muted">
                        {" "}
                        ₹ {Productd.ProductPrice}
                      </del>
                    </div>
                    <p>
                      Modern look and quality demo item is a streetwear-inspired
                      collection that continues to break away from the
                      conventions of mainstream fashion. Made in Italy, these
                      black and brown clothing low-top shirts for men.
                    </p>
                    <div className="row">
                      <dt className="col-3">Type:</dt>
                      <dd className="col-9">{Productd.ProductDescription}</dd>

                      <dt className="col-3">Color</dt>
                      <dd className="col-9">{Productd.ProductColor}</dd>

                      <dt className="col-3">Material</dt>
                      <dd className="col-9">Dri fit</dd>

                      <dt className="col-3">Brand</dt>
                      <dd className="col-9">{Productd.ProductBrand}</dd>
                    </div>
                    <hr style={{ borderColor: "black" }} />
                    <div className="col-md-10 col-10 mb-3">
                      <label className="mb-2 d-block">Sizes</label>
                      <>
                        {Productd.ProductSize.map((i) => (
                          <>
                            <input
                              type="radio"
                              className="btn-check "
                              name="options-outlined"
                              id={i}
                              autoComplete="off"
                              defaultChecked={ProductSize}
                              onChange={(e) => {
                                setProductSize(e.target.id);
                              }}
                            />
                            <label
                              className="btn btn-outline-success mx-2"
                              htmlFor={i}
                            >
                              {i}
                            </label>
                          </>
                        ))}
                      </>
                    </div>
                    <div className="row mb-4">
                      {/* <!-- col.// --> */}
                      <div className="col-md-4 col-6 mb-3">
                        <label className="mb-2 d-block">Quantity</label>
                        <div
                          className="input-group mb-3"
                          style={{ width: " 170px" }}
                        >
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon1"
                            data-mdb-ripple-color="dark"
                            onClick={decrementCounter}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control text-center border border-secondary"
                            placeholder="14"
                            value={counter}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            cursor="none"
                          />
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon2"
                            data-mdb-ripple-color="dark"
                            onClick={incrementCounter}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      id={Productd.id}
                      className="btn btn-warning shadow-0"
                      onClick={(e) => {
                        CartAdd(Productd);
                        navigate("/order");
                      }}
                    >
                      {" "}
                      Buy now{" "}
                    </button>{" "}
                    <a
                      className="btn btn-primary shadow-0"
                      href={`#!add${Math.floor(Math.random() * 99999999)}`}
                      id={Productd.id}
                      onClick={(e) => {
                        CartAdd(Productd);
                      }}
                    >
                      {" "}
                      <i className="me-1 fa fa-shopping-basket"></i> Add to cart{" "}
                    </a>{" "}
                    {/* <button
                    href="#"
                    className="btn btn-light border border-secondary py-2 icon-hover px-3"
                  >
                    {" "}
                    <i className="me-1 fa fa-heart fa-lg"></i> Save{" "}
                  </button>{" "} */}
                  </div>
                </main>
              </div>
            </div>
          </section>
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
                      class="btn btn-success btn-sm"
                    >
                      view All <i class="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </header>

              <div className="row">
                <ProductsCard Product={Product.slice(0, 4)} />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductD;
