import React,{useState} from 'react';
import Loader from '../../component/layout/Loader/Loader';

function SecureRouteLogin(props) {
    const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
    if (!User) {
        return <Loader />
    }
    return (
        <>
        
        </>
    );
}

export default SecureRouteLogin;