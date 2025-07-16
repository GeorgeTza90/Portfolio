import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/index";
import Difficulty from "./pages/Home/difficulty";
import Start from "./pages/Game/index";


function AppRouter() {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/difficulty" element={<Difficulty />} />
                <Route path="/start" element={<Start />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
