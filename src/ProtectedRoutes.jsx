import { Outlet } from "react-router"
import { useContext } from "react";
import { UserContext } from "./App";

const ProtectedRoutes = () => {

    const {user} = useContext(UserContext)    

    const changeURL = () => {
        window.location.href = '/signin'
    }

    return (
        user ? <Outlet /> : changeURL()
    )
}

export default ProtectedRoutes;