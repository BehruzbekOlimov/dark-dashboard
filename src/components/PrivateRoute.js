import {useNavigate} from 'react-router-dom';
import axiosClient from "../utills/axiosClient";
import {LOCAL_STORAGE_NAME} from "../utills/constants";
import {useEffect} from "react";

export {PrivateRoute};

function PrivateRoute({children, user, setUser}) {

    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            if (!localStorage.getItem(LOCAL_STORAGE_NAME)) {
                navigate('/sign-in')
            }

            axiosClient.get("/user/get-me")
                .then(res => {
                    setUser(res.data)
                }).catch((e) => {
                console.log(e)
                localStorage.removeItem(LOCAL_STORAGE_NAME)
                navigate('/sign-in')
            })
            // not logged in so redirect to login page with the return url
        }
    }, [user])


    // authorized so return child components
    return children;
}
