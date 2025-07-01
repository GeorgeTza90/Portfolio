import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";

const MainLayout: React.FC = () => {
  return (
    <>
      <Nav />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
