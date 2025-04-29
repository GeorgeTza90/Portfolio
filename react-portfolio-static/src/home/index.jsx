import PortfolioPages from "../components/PortfolioPages.jsx";
import PortfolioAnimations from "../components/PortfolioAnimations.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
    return (
        <>
            <Header />
            <PortfolioPages />
            <PortfolioAnimations />
            <Footer />
        </>
    );
}

export default Home;
