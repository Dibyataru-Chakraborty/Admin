import React from "react";
import "./ProductsCard.css";
import { Link } from "react-router-dom";
function ProductsCard(props) {
  const Products = props.Product;
  return (
    <div className="container my-2">
      <div className="row row-cols-2 row-cols-md-6 g-2">
        {Products.map((i) => (
          <div className="col-md-3 col-sm-4 .col-sm-6 ">
            <div className="product-grid7 ">
              <div className="product-image7" >
              <img className="pic-1"  alt="" src={i.imagePreview[0]} />
                <Link to={`/product/${i.id}`} onClick={(e) => {window.scrollTo(0, 0);}} >
                  <img className="pic-2"  src={i.imagePreview[0]} />
                </Link>
                <ul className="social">
                  <li>
                    <Link
                      to={`/product/${i.id}`}
                      className="fa fa-search"
                      onClick={(e) => {
                        window.scrollTo(0, 0);
                      }}
                    />
                  </li>
                  <li>
                    <Link href="" className="fa fa-shopping-bag" />
                  </li>
                  <li>
                    <Link href="" className="fa fa-shopping-cart" />
                  </li>
                </ul>
                <span className="product-new-label">New</span>
              </div>
              <div className="product-content p-0">
                <h3 className="title p-0  text-truncate overflow-hidden">
                  <Link
                    to={`/product/${i.id}`}
                    onClick={(e) => {
                      window.scrollTo(0, 0);
                    }}
                    className="h5 "
                  >
                    {i.ProductName}
                  </Link>
                </h3>

                <div className="price">
                  ₹ {i.ProductOfferPrice}.00
                  <span>₹ {i.ProductPrice}.00</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsCard;
