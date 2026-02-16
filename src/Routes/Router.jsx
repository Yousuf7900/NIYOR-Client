import { createBrowserRouter } from "react-router";
import ErrorPage from "../components/ErrorPage";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Login from "../pages/AuthPages/Login";
import Register from "../pages/AuthPages/Register";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../pages/UserPages/MyProfile";
import OrderHistory from "../pages/UserPages/OrderHistory";
import AddressBook from "../pages/UserPages/AddressBook";
import Overview from "../pages/AdminPages/Overview";
import AddProduct from "../pages/AdminPages/AddProduct";
import Analytics from "../pages/AdminPages/Analytics";
import Customers from "../pages/AdminPages/Customers";
import Orders from "../pages/AdminPages/Orders";
import Products from "../pages/AdminPages/Products";
import Loading from "../components/Loading";
import PrivateRoutes from "./PrivateRoutes";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import OrderSuccess from "../components/OrderSuccess";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: '/checkout',
                element: <Checkout></Checkout>
            },
            {
                path: '/order-success',
                element: <OrderSuccess></OrderSuccess>
            },
            {
                path: '/loading',
                element: <Loading></Loading>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [

            // user based dashboard routes
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'order-history',
                element: <OrderHistory></OrderHistory>
            },
            {
                path: 'address',
                element: <AddressBook></AddressBook>
            },


            // admin based dashboard routes
            {
                path: 'overview',
                element: <Overview></Overview>
            },
            {
                path: 'add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path: 'analytics',
                element: <Analytics></Analytics>
            },
            {
                path: 'manage-customer',
                element: <Customers></Customers>
            },
            {
                path: 'orders',
                element: <Orders></Orders>
            },
            {
                path: 'products',
                element: <Products></Products>
            }
        ]
    }
])

export default Router;