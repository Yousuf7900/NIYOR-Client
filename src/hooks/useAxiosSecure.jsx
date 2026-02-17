import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
    // baseURL: "https://niyor-backend.vercel.app"  //this will be used for production url.
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    const location = useLocation();
    useEffect(() => {
        const reqId = axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorizaton = `Bearer ${token}`;
            }
            else {
                delete config.headers.authorizaton;
            }
            return config;
        },
            (error) => Promise.reject(error)
        );
        const resId = axiosSecure.interceptors.response.use(response => response, async (error) => {
            const status = error?.response?.status;
            if ((status === 401) && location.pathname !== '/login') {
                await logOut();
                navigate('/login', { replace: true })
            }
            return Promise.reject(error);
        });
        return () => {
            axiosSecure.interceptors.request.eject(reqId);
            axiosSecure.interceptors.response.eject(resId);
        };
    }, [navigate, logOut, location.pathname]);

    return axiosSecure;
};

export default useAxiosSecure;