import React from "react";
import "./productcard.css";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { message } from "antd";
import { AddToCard } from "./AddtoCard";
import { useEffect, useState } from "react";
import Loader from "../../layout/Loader/Loader";
import ProductsCard from "./ProductsCard";

export default function Productcard() {
  const Product = [];
  JSON.parse(sessionStorage.getItem("ProductsData")).forEach(element => {
    if(element !== null){
      Product.push({
        ProductBrand:element.ProductBrand,
        imagePreview:element.imagePreview,
        id:element.id,
        ProductStock:element.ProductStock,
        ProductSize:element.ProductSize,
        ProductPrice:element.ProductPrice,
        ProductOfferPrice:element.ProductOfferPrice,
        ProductName:element.ProductName,
        ProductDescription:element.ProductDescription,
        ProductColor:element.ProductColor,
        ProductCategory:element.ProductCategory,
        Quantity:1
      })
    }
  });
  const AddToCard = (e) => {
    const existingCartData = JSON.parse(localStorage.getItem("Cartdata")) || [];
  
    const isItemInCart = existingCartData.some((item) => item.id === e.id);
    if (!isItemInCart) {
      const updatedCartData = [...existingCartData, e];
      localStorage.setItem("Cartdata", JSON.stringify(updatedCartData));
    }
  };
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  if (Product.length===0) {
    return <Loader />
  }
  return (
    <>
      <section>
        <div className="container my-5">
          <header className="mb-4">
            <h3>Recommended items</h3>
          </header>
          <ProductsCard Product={Product.slice(0, 8)} />
          <div className="d-grid gap-2 col-4 mx-auto">
          <Link to={"/products"} className="btn btn-success btn-lg" type="button">
            View All 
          </Link>
        </div>
        </div>
        
      </section>
    </>
  );
}
