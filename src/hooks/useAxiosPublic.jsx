import axios from "axios";

const axiosPublic = axios.create({
    //baseURL: "http://localhost:3000",
    //baseURL: "http://192.168.0.105:3000",
    baseURL: "https://niyor-backend.vercel.app"  //this will be used for production url.
});

const useAxiosPublic = () => {
    return axiosPublic;
}
export default useAxiosPublic;