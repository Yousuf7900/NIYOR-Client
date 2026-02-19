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
import Overview from "../pages/AdminPages/Dashboard";
import AddProduct from "../pages/AdminPages/AddProduct";
import Analytics from "../pages/AdminPages/Analytics";
import Customers from "../pages/AdminPages/Customers";
import Orders from "../pages/AdminPages/ManageOrders";
import Products from "../pages/AdminPages/ManageProducts";
import Loading from "../components/Loading";
import PrivateRoutes from "./PrivateRoutes";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import OrderSuccess from "../components/OrderSuccess";
import ManageProducts from "../pages/AdminPages/ManageProducts";
import ManageOrders from "../pages/AdminPages/ManageOrders";
import Dashboard from "../pages/AdminPages/Dashboard";
import Settings from "../pages/AdminPages/Settings";
import MyReviews from "../pages/UserPages/MyReviews";
import OrderDetails from "../pages/UserPages/OrderDetails";
import AdminProductDetails from "../pages/AdminPages/AdminProductDetails";
import UpdateProductDetails from "../pages/AdminPages/UpdateProductDetails";
import EditProfile from "../pages/UserPages/EditProfile";

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
                path: 'my-orders',
                element: <OrderHistory></OrderHistory>
            },
            {
                path: 'address',
                element: <AddressBook></AddressBook>
            },
            {
                path: 'my-reviews',
                element: <MyReviews></MyReviews>
            },
            {
                path: 'order-details',
                element: <OrderDetails></OrderDetails>
            },
            {
                path: 'profile/edit',
                element: <EditProfile></EditProfile>
            },


            // admin based dashboard routes
            {
                path: 'admin-home',
                element: <Dashboard></Dashboard>
            },
            {
                path: 'add-products',
                element: <AddProduct></AddProduct>
            },
            {
                path: 'analytics',
                element: <Analytics></Analytics>
            },
            {
                path: 'manage-users',
                element: <Customers></Customers>
            },
            {
                path: 'manage-orders',
                element: <ManageOrders></ManageOrders>
            },
            {
                path: 'manage-products',
                element: <ManageProducts></ManageProducts>
            },
            {
                path: 'settings',
                element: <Settings></Settings>
            },
            {
                path: 'manage-products/:id',
                element: <AdminProductDetails></AdminProductDetails>
            },
            {
                path: 'edit-product/:id',
                element: <UpdateProductDetails></UpdateProductDetails>
            }
        ]
    }
])

export default Router;