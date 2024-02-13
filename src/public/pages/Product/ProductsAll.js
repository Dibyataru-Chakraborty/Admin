import React from "react";
import "./Products.css";
import ProductsCard from "../../component/layout/Product/ProductsCard";
import { Link } from "react-router-dom";

function ProductsAll(props) {
  const Product = JSON.parse(sessionStorage.getItem("ProductsData")) || [];
  return (
    <>
      <div className="container my-5">
        <header className="mb-4 mx-3">
          <h3>All Products</h3>
        </header>
        <nav aria-label="breadcrumb  ">
          
          <ol className="breadcrumb mx-3">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            
            <li className="breadcrumb-item active" aria-current="page">
              Products
            </li>
          </ol>
        </nav>

        <ProductsCard Product={Product} />
      </div>
    </>
  );
}

export default ProductsAll;
