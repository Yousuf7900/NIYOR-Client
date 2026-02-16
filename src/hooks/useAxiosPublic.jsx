import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:3000",
    // baseURL: ""  this will be used for production url.
});

const useAxiosPublic = () => {
    return axiosPublic;
}
export default useAxiosPublic;