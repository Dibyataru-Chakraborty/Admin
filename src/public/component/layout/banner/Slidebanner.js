import React from "react";
import { Link } from "react-router-dom";
export default function Slidebanner() {
  return (
    <>
      <div
        id="carouselExampleInterval"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner shadow" >
          <div className="carousel-item active" data-bs-interval={4000}>
            <img src="CAR 1.png" className="d-block w-100" alt="CT16" />
          </div>
          <div className="carousel-item" data-bs-interval={2000}>
            <img src="CAR 2.png" className="d-block w-100 h-50" alt="CT16" />
          </div>
          <div className="carousel-item">
            <img src="CAR 3.png" className="d-block w-100" alt="CT16" />
          </div>
          <div className="carousel-item">
            <img src="CAR 4.png" className="d-block w-100" alt="CT16" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* 4 DIV banner */}
      <div className="container my-5">
        <div className="row row-cols-4 row-cols-md-4 g-4">
          <Link to="" className="col" >
            <div className="card border-0 h-100 rounded-top rounded-circle">
              <img src="ct/1.png" className="card-img-top" alt="..." />
            </div>
          </Link>
          <Link to="" className="col">
            <div className="card border-0 h-100 rounded-top rounded-circle">
              <img src="ct/2.png" className="card-img-top" alt="..." />
            </div>
          </Link>
          <Link to="" className="col">
            <div className="card border-0 h-100 rounded-top rounded-circle">
              <img src="ct/3.png" className="card-img-top" alt="..." />
            </div>
          </Link>
          <Link to="" className="col">
            <div className="card border-0 h-100 rounded-top rounded-circle">
              <img src="ct/4.png" className="card-img-top" alt="..." />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
