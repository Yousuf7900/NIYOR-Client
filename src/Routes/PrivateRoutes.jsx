import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation();

    if (loading) {
        return <Loading text={"Verifying access..."}></Loading>
    }

    if (user) {
        return children;
    }
    return <Navigate state={{ from: location }} to={'/login'} replace:true />
};

export default PrivateRoutes;