import { Routes, Route, useLocation } from "react-router-dom";
import News from "./pages/News/index";
import Destination from "./pages/Destination/index";
import About from "./pages/About/index";
import Contact from "./pages/Contact/index";
import Purchase from "./pages/Purchase/index";
import Payment from "./pages/Purchase/payment";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import LoadingScreen from "./pages/Loading/LoadingScreen";
import MainLayout from "./layouts/MainLeyout";
import useLoading from "./hooks/useLoading"

function AppRouter() {
    const WithLoading = ({ children }) => {
        const loading = useLoading();
        return loading ? <LoadingScreen /> : children;
    };

    return (
        <Routes>
            <Route element={<WithLoading><MainLayout /></WithLoading>}>
                <Route path="/" element={<News />} />
                <Route path="/destination" element={<Destination />} />
            </Route>
            <Route element={<MainLayout />}>
                <Route path="/destination" element={<Destination />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
