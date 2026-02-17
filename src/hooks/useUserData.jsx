import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: userData = {}, isPending: loading, isError, refetch } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`api/users/${user.email}`);
            return res.data;
        },
    });
    return { userData, loading, isError, refetch };
};

export default useUserData;