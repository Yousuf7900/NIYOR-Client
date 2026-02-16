import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
    return (
        <div>
            <nav>
                <Navbar></Navbar>
            </nav>
            <Outlet></Outlet>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;