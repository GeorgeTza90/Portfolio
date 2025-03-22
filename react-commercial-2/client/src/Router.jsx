import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/index";
import Profile from "./pages/Home/profile";
import Player from "./pages/Player/index";
import Uploader from "./pages/Player/Uploader";
import About from "./pages/About/index";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Store from "./pages/Store/index";


function AppRouter() {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/player" element={<Player />} />
                <Route path="/player/upload" element={<Uploader />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/store" element={<Store />} />
                <Route path="/purchase" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
