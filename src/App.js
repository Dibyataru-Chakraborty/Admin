import { Routes, Route } from "react-router-dom";


import Navbar from "./public/component/layout/navbar/Navbar"
import Footer from './public/component/layout/Footer/Footer'
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Utils/Firebase/Firebase_config";
import AdminProductList from "./admin/Pruduct/AdminProductList";
import AdminUserList from "./admin/User/AdminUserList";

import AdminHomePage from "./admin/AdminHomePage";
import AdminProductAdd from "./admin/Pruduct/AdminProductAdd";
import AdminOrderList from "./admin/Order/AdminOrderList";
import AdminProductEdit from "./admin/Pruduct/AdminPruductEdit";
import AdminOrderEdit from "./admin/Order/AdminOrderEdit";

=======
import UserSignUP from './public/pages/Auth/UserSignUp';
import UserLogin from './public/pages/Auth/UserLogin';
import ResetPassword from './public/pages/Auth/ResetPassword'
import UserForgotPass from "./public/pages/Auth/UserForgotPass";
import Cart from "./public/pages/Home/Cart";
import ProductD from "./public/pages/Product/ProductD";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Utils/Firebase/Firebase_config";
import Order from "./public/pages/Order/Order";
import UserAddress from "./public/pages/Order/UserAddress";
import ProductsAll from "./public/pages/Product/ProductsAll";
import UserAccount from "./public/pages/User/UserAccount";
import OrderD from "./public/pages/Order/OrderD";
>>>>>>> 2148cd9f8cb219e19fd7efe38796cb14be97f10a

function App() {

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // // "I" key
      // if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      //   disabledEvent(e);
      // }
      // // "J" key
      // if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      //   disabledEvent(e);
      // }
      // // "S" key + macOS
      // if (
      //   e.keyCode === 83 &&
      //   (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      // ) {
      //   disabledEvent(e);
      // }
      // // "U" key
      // if (e.ctrlKey && e.keyCode === 85) {
      //   disabledEvent(e);
      // }
      // // "F12" key
      // if (e.keyCode === 123) {
      //   disabledEvent(e);
      // }
    };

    const disabledEvent = (e) => {
      // if (e.stopPropagation) {
      //   e.stopPropagation();
      // } else if (window.event) {
      //   window.event.cancelBubble = true;
      // }
      // e.preventDefault();
      // return false;
    };

    // document.addEventListener("contextmenu", handleContextMenu, false);
    // document.addEventListener("keydown", handleKeyDown, false);

    // return () => {
    //   document.removeEventListener("contextmenu", handleContextMenu, false);
    //   document.removeEventListener("keydown", handleKeyDown, false);
    // };
  }, []);


  const [ProductsData, setProductsData] = useState([]);
  const Products = () => {
    onValue(ref(db, "Product"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setProductsData([]);
      } else {
        // Convert the object into an array of customer objects
        const productArray = Object.keys(data).map((productId) => ({
          id: productId,
          ...data[productId],
        }));

        // Update the state with the array of customer objects
        setProductsData(productArray);
      }
    });
  };
  sessionStorage.setItem("ProductsData", JSON.stringify(ProductsData));

  const [OrderHistoryData, setOrderHistoryData] = useState([]);
  const OrderHistory = () => {
    const uid = JSON.parse(localStorage.getItem("user"));
    onValue(ref(db, `Users/${uid}/Ordered/`), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setOrderHistoryData([]);
      } else {
        // Convert the object into an array of customer objects
        const productArray = Object.keys(data).map((productId) => ({
          id: productId,
          ...data[productId],
        }));

        // Update the state with the array of customer objects
        setOrderHistoryData(productArray);
      }
    });
  };
  sessionStorage.setItem("OrderHistory", JSON.stringify(OrderHistoryData));

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        Products(),
        OrderHistory()
      ]);
    };
    fetchData();
  }, []);

  // const [isOnline, setIsOnline] = useState(navigator.onLine);
  // useEffect(() => {
  //   const updateOnlineStatus = () => {
  //     setIsOnline(navigator.onLine);
  //   };

  //   window.addEventListener("online", updateOnlineStatus);
  //   window.addEventListener("offline", updateOnlineStatus);

  //   return () => {
  //     window.removeEventListener("online", updateOnlineStatus);
  //     window.removeEventListener("offline", updateOnlineStatus);
  //   };
  // }, []);

  return (
    <>
    <Routes>
      <Route exact path="/">
<<<<<<< HEAD
        <Route exact path="/" element={ <> <AdminHomePage /> <Footer/> </> } />
        <Route exact path="/admin-product-list" element={ <><Navbar /><AdminProductList /> <Footer/> </> } />
        <Route exact path="/admin-user-list" element={ <><Navbar /><AdminUserList /> <Footer/> </> } />
        <Route exact path="/admin-order-list" element={ <><Navbar /><AdminOrderList /> <Footer/> </> } />
        <Route exact path="/admin-product-add" element={ <><Navbar /><AdminProductAdd /> <Footer/> </> } />
        <Route exact path="/admin-product-Edit/:id" element={ <><Navbar /><AdminProductEdit /> <Footer/> </> } />
        <Route exact path="/admin-order-Edit/:id" element={ <><Navbar /><AdminOrderEdit /> <Footer/> </> } />
        
=======

        {/* Public */}
        <Route exact path="/" element={ <><Navbar/> <Slidebanner/><Productcard/> <LongBanner /> <CategoriesBanner /> <Footer/> </> } />
        <Route exact path="cart" element={ <><Navbar/>  <Cart />  <Footer/> </> } />
        <Route exact path="product/:id" element={ <><Navbar />  <ProductD />  <Footer/> </> } />
        <Route exact path="products" element={ <><Navbar />  <ProductsAll />  <Footer/> </> } />
        <Route exact path="login" element={ <><Navbar/> <UserLogin/> <Footer/> </> } />
        <Route exact path="signup" element={ <><Navbar/> <UserSignUP/> <Footer/> </> } />

        <Route exact path="order" element={ <><Navbar/> <Order  /> <Footer/> </> } />
        <Route exact path="user-account/order/:id" element={ <><Navbar/> <OrderD/> <Footer/> </> } />
        <Route exact path="user-account" element={ <><Navbar/> <UserAccount OrderData={OrderHistoryData} /> <Footer/> </> } />
        <Route exact path="user-account/user-address" element={ <><Navbar/> <UserAddress/> <Footer/> </> } />

        <Route exact path="forgotpassword" element={ <><Navbar/> <UserForgotPass/> <Footer/> </> } />
        <Route exact path="__/auth/action?" element={<><ResetPassword/></>}/>
  
>>>>>>> 2148cd9f8cb219e19fd7efe38796cb14be97f10a
      </Route>

    </Routes>
    </>
  );
}

export default App;
