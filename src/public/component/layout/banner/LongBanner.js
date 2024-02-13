import React from 'react';
import { Link } from "react-router-dom";
const LongBanner = () => {
    return (
        <div className="container my-0 ">
            <Link class="card border-0 h-100 rounded-3 ">
              <img src="replicate.png" class="card-img-top rounded-3 shadow-lg" alt="..." />
            </Link>
        </div>
    );
};

export default LongBanner;