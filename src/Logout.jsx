import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const useNav = useNavigate();
    
    useEffect(() => {

        sessionStorage.clear(); // <-- Clears the session storage

        useNav('/'); // <-- Sends you home
    }, []);
}
export default Logout;