import React from "react";
import "./OrderTrack.css";

function OrderTrack(props) {
  return (
    <div className="container p-0" id="OrderTrack">
      <div className="card my-2">
        {/* Add class 'active' to progress */}
        <div className="row d-flex justify-content-center">
          <div className="">
            <ul id="progressbar" className="text-center">
              <li className="active step0" />
              <li className=" step0" />
              <li className=" step0" />
              <li className="step0" />
            </ul>
          </div>
        </div>
        <div className="row row-cols-2 row-cols-md-4 px-3 g-2">
          <div className="col d-flex icon-content">
            <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
            <div className="d-flex flex-column">
              <p className="font-weight-bold">
                Order
                <br />
                Processed
              </p>
            </div>
          </div>
          <div className="col d-flex icon-content">
          <img className="icon" src="https://i.imgur.com/u1AzR7w.png" />
            <div className="d-flex flex-column">
              <p className="font-weight-bold">
                Order
                <br />
                Shipped
              </p>
            </div>
          </div>
          <div className="col d-flex icon-content">
          <img className="icon" src="https://i.imgur.com/TkPm63y.png" />
            <div className="d-flex flex-column">
              <p className="font-weight-bold">
                Order
                <br />
                En Route
              </p>
            </div>
          </div>
          <div className="col d-flex icon-content">
          <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
            <div className="d-flex flex-column">
              <p className="font-weight-bold">
                Order
                <br />
                Arrived
              </p>
            </div>
          </div>
          
        </div>
        {/* <div className="row justify-content-between top">
          <div className="row d-flex icon-content">
            <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
            <div className="d-flex flex-column">
              <p className="font-weight-bold">
                Order
                <br />
                Processed
              </p>
            </div>
          </div>
          <div className="row d-flex icon-content">
            <img className="icon" src="https://i.imgur.com/u1AzR7w.png" />
            <div className="d-flex flex-column">
              <p className="font-weight-bold">
                Order
                <br />
                Shipped
              </p>
            </div>
          </div>
          <div className="row d-flex icon-content">
            <img className="icon" src="https://i.imgur.com/TkPm63y.png" />
            <div className="d-flex flex-column">
              <p className="font-weight-bold">
                Order
                <br />
                En Route
              </p>
            </div>
          </div>
          <div className="row d-flex icon-content">
            <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
            <div className="d-flex flex-column">
              <p className="font-weight-bold">
                Order
                <br />
                Arrived
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default OrderTrack;
