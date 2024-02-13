import { message } from "antd";
// let cartData = JSON.parse(localStorage.getItem("Cartdata")) || [];

// remove Cart
export const RemoveToCard = (id) => {
  // Retrieve existing items from local storage
  const existingCartData = JSON.parse(localStorage.getItem("Cartdata")) || [];

  // Create a new array excluding the item with the specified id
  const updatedCartData = existingCartData.filter((item) => item.id !== id);

  // Update local storage with the updated cart data
  localStorage.setItem("Cartdata", JSON.stringify(updatedCartData));

  message.success("Product Removed", 1.5);
};

// export const EditToCart = (id, quenty) => {
//   const Carddata = [];
//   if (cartData) {
//     cartData.map((i) => {
//       if (i.id !== id) {
//         Carddata.push(i);
//       } else if (i.id === id) {
//         i.quenty = quenty;
//         Carddata.push(i);
//       }
//     });
//   }
//   localStorage.setItem("Cartdata", JSON.stringify(Carddata));
//   message.success("Update Product", 1.5);
// };
export const EditToCart = (id, Quantity) => {
  const existingCartData = JSON.parse(localStorage.getItem("Cartdata")) || [];

  const updatedCartData = existingCartData.map((item) => {
    if (item.id === id) {
      return { ...item, Quantity };
    }
    return item;
  });

  localStorage.setItem("Cartdata", JSON.stringify(updatedCartData));

  message.success("Product Updated", 1.5);
};

