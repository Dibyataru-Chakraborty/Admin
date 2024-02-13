import React, { useEffect, useState } from "react";
import "./AdminProductList.css";
import { onValue, ref } from "firebase/database";
import { db } from "../../Utils/Firebase/Firebase_config";

function AdminUserList(props) {

  const [UsersData, setUsersData] = useState([]);
  const Users = () => {
    onValue(ref(db, "Product"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setUsersData([]);
      } else {
        // Convert the object into an array of customer objects
        const usersArray = Object.keys(data).map((usersId) => ({
          id: usersId,
          ...data[usersId],
        }));

        // Update the state with the array of customer objects
        setUsersData(usersArray);
      }
    });
  };
  sessionStorage.setItem("UsersData", JSON.stringify(UsersData));

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        Users()
      ]);
    };
    fetchData();
  }, []);

  var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 card-margin">
          <div className="card search-form">
            <div className="card-body p-0">
              <form id="search-form">
                <div className="row">
                  <div className="col-12">
                    <div className="row no-gutters">
                      <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                        >
                          <option>Location</option>
                          <option>London</option>
                          <option>Boston</option>
                          <option>Mumbai</option>
                          <option>New York</option>
                          <option>Toronto</option>
                          <option>Paris</option>
                        </select>
                      </div>
                      <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="form-control"
                          id="search"
                          name="search"
                        />
                      </div>
                      <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                        <button type="submit" className="btn btn-base">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                          >
                            <circle cx={11} cy={11} r={8} />
                            <line x1={21} y1={21} x2="16.65" y2="16.65" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-margin">
            <div className="card-body">
              <div className="row search-body">
                <div className="col-lg-12">
                  <div className="search-result">
                    <div className="result-header">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="records">
                            Showing :  <b>200</b> result
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="result-actions">
                            <div className="result-sorting">
                              <span>Sort By:</span>
                              <select
                                className="form-control border-0"
                                id="exampleOption"
                              >
                                <option value={1}>Relevance</option>
                                <option value={2}>Names (A-Z)</option>
                                <option value={3}>Names (Z-A)</option>
                              </select>
                            </div>
                            <div className="result-views">
                              <button
                                type="button"
                                className="btn btn-soft-base btn-icon"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-list"
                                >
                                  <line x1={8} y1={6} x2={21} y2={6} />
                                  <line x1={8} y1={12} x2={21} y2={12} />
                                  <line x1={8} y1={18} x2={21} y2={18} />
                                  <line x1={3} y1={6} x2={3} y2={6} />
                                  <line x1={3} y1={12} x2={3} y2={12} />
                                  <line x1={3} y1={18} x2={3} y2={18} />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft-base btn-icon"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-grid"
                                >
                                  <rect x={3} y={3} width={7} height={7} />
                                  <rect x={14} y={3} width={7} height={7} />
                                  <rect x={14} y={14} width={7} height={7} />
                                  <rect x={3} y={14} width={7} height={7} />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="result-body">
                      <div className="table-responsive">
                        <table className="table widget-26">
                          <tbody>
                            {list.map((e) => (
                              <tr>
                                <td>
                                  <div className="widget-26-job-emp-img">
                                    <img
                                      src="https://calcutta16.com/web_logo_br.png"
                                      alt="Company"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-26-job-title">
                                    <a href="#">
                                      User name ...
                                    </a>
                                    <p className="m-0">
                                      <a href="#" className="employer-name">
                                        #User Email....
                                      </a>{" "}
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-26-job-info">
                                    <p className="type m-0">#User id</p>
                                    <p className="text-muted m-0">
                                      in{" "}
                                      <span className="location">
                                        Date
                                      </span>
                                    </p>
                                  </div>
                                </td>

                                <td>
                                  <div className="widget-26-job-category bg-soft-base">
                                    <span> Role : User</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-26-job-starred">
                                  <button type="button" class="btn btn-success btn-sm">View Order</button>
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-26-job-starred">
                                  <button type="button" class="btn btn-danger btn-sm">delete</button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="d-flex justify-content-center">
                <ul className="pagination pagination-base pagination-boxed pagination-square mb-0">
                  <li className="page-item">
                    <a className="page-link no-border" href="#">
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link no-border" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link no-border" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link no-border" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link no-border" href="#">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link no-border" href="#">
                      <span aria-hidden="true">»</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserList;
