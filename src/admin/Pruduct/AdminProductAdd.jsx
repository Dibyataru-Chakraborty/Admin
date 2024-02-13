import React, { useState } from "react";
import { db } from "../../Utils/Firebase/Firebase_config";
import { push, ref as DbRef } from "firebase/database";
import TextArea from "antd/es/input/TextArea";

function AdminProductAdd() {
  const [imagePreview, setImagePreview] = useState([]);
  const [ImageData, setImageData] = useState([]);
  const [ProductName, setProductName] = useState("");
  const [ProductStock, setProductStock] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [ProductOfferPrice, setProductOfferPrice] = useState("");
  const [ProductColor, setProductColor] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductBrand, setProductBrand] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [ProductSize, setProductSize] = useState([]);

  const Addimg = (e) => {
    const files = Array.from(e.target.files);
    setImageData((old) => [...old, e.target.files]);
    files.forEach((file) => {
      // Validate file type
      if (
        !file.type.includes("image/jpeg") &&
        !file.type.includes("image/png")
      ) {
        alert("Please upload only JPEG or PNG images.");
        return;
      }

      // Validate file size (1MB)
      if (file.size > 1024 * 1024) {
        alert("File size exceeds 1MB. Please upload a smaller file.");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImagePreview = [...imagePreview];
    newImagePreview.splice(index, 1);
    setImagePreview(newImagePreview);
    const newImageData = [...ImageData];
    newImageData.splice(index, 1);
    setImageData(newImageData);
  };

  const Checkbox = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setProductSize([...ProductSize, value]);
    } else {
      setProductSize(ProductSize.filter((e) => value !== e));
    }
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ProductName,
      ProductStock,
      ProductPrice,
      ProductOfferPrice,
      ProductColor,
      ProductCategory,
      ProductBrand,
      ProductDescription,
      ProductSize,
      imagePreview,
    };
    await push(DbRef(db, "Product/"), data);
    alert("Submit")
  };

  return (
    <>
      <div className="container border border-dark rounded mt-3 mb-3 p-3" >
        <form
          onSubmit={(e) => {
            FormSubmit(e);
          }}
        >
          <fieldset>
            <legend>Admin Product Add </legend>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="disabledTextInput" className="form-label">
                    Product name
                  </label>
                  <input
                    required
                    type="text"
                    id="disabledTextInput"
                    className="form-control"
                    placeholder="name"
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="disabledTextInput" className="form-label">
                    Stock
                  </label>
                  <input
                    required
                    type="number"
                    id="disabledTextInput"
                    className="form-control"
                    placeholder="Total Stock "
                    onChange={(e) => {
                      setProductStock(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-4">
                <label className="form-label">Size</label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    required
                    type="checkbox"
                    className="form-check-input"
                    id="M"
                    value="M"
                    onChange={Checkbox}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    M
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    required
                    type="checkbox"
                    className="form-check-input"
                    id="L"
                    onChange={Checkbox}
                    value="L"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    L
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    required
                    type="checkbox"
                    className="form-check-input"
                    id="XL"
                    onChange={Checkbox}
                    value="XL"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    XL
                  </label>
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="disabledTextInput" className="form-label">
                    Price
                  </label>
                  <input
                    required
                    type="number"
                    id="disabledTextInput"
                    className="form-control"
                    placeholder="Total Price "
                    onChange={(e) => {
                      setProductPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="disabledTextInput" className="form-label">
                    Offer Price
                  </label>
                  <input
                    required
                    type="number"
                    id="disabledTextInput"
                    className="form-control"
                    placeholder="Offer Price "
                    onChange={(e) => {
                      setProductOfferPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload Image
                  </label>
                  <input
                    required
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) => {
                      Addimg(e);
                    }}
                    multiple
                    accept=".jpeg, .jpg, .png"
                  />
                </div>
                <div className="row">
                  <h5>Preview:</h5>

                  {imagePreview.map((item, index) => (
                    <div key={index} className="mt-3 col">
                      <img
                        src={item}
                        alt={`Preview ${index + 1}`}
                        style={{ width: 100, height: 100 }}
                      />
                      <button
                        className="btn btn-danger btn-close"
                        onClick={() => removeImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="disabledTextInput" className="form-label">
                    Product Color
                  </label>
                  <input
                    required
                    type="text"
                    id="disabledTextInput"
                    className="form-control"
                    placeholder="Color"
                    onChange={(e) => {
                      setProductColor(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="disabledTextInput" className="form-label">
                    Product category
                  </label>
                  <input
                    required
                    type="text"
                    id="disabledTextInput"
                    className="form-control"
                    placeholder="category"
                    onChange={(e) => {
                      setProductCategory(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="disabledTextInput" className="form-label">
                    Product Brand
                  </label>
                  <input
                    required
                    type="text"
                    id="disabledTextInput"
                    className="form-control"
                    placeholder="Brand"
                    onChange={(e) => {
                      setProductBrand(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <TextArea
                    autoSize
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    onChange={(e) => {
                      setProductDescription(e.target.value);
                    }}
                  ></TextArea>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default AdminProductAdd;
