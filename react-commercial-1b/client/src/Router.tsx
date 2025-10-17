import type { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import News from "./pages/News/index.tsx";
import Destination from "./pages/Destination/index.tsx";
import About from "./pages/About/index.tsx";
import Contact from "./pages/Contact/index.tsx";
import Purchase from "./pages/Purchase/index.tsx";
import Payment from "./pages/Purchase/Payment.tsx";
import Login from "./pages/Auth/login.tsx";
import Register from "./pages/Auth/register.tsx";
import LoadingScreen from "./pages/Loading/LoadingScreen.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import useLoading from "./hooks/useLoading";

function AppRouter() {
  const WithLoading = ({ children }: { children: ReactNode }) => {
    const loading = useLoading();
    return loading ? <LoadingScreen /> : <>{children}</>;
  };

  return (
    <Routes>
      <Route element={<WithLoading><MainLayout /></WithLoading>}>

      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<News />} />
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
