import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Nav />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
