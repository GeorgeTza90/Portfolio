import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./DestCard.module.css";
import Carousel from "../Cards/Carousel";


function DestCard({ dest }) {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dest.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(dest.length / itemsPerPage);
    const navigate = useNavigate();
    const [cookies] = useCookies(["auth_token"]);
    const isLoggedIn = cookies.auth_token;

    const PurchaseButton = () => {
        if (isLoggedIn === "undefined") {
            navigate("/login");
        } else {
            navigate("/purchase");
        }
    };

    return (
        <>
            {currentItems.length > 0 ? (
                currentItems.map((destination) => (
                    <div className={styles.all} key={destination.id}>
                        <div className={styles.card}>
                            <div className={styles.items}>
                                <div className={styles.imgDiv}>
                                    <Carousel
                                        images={[
                                            `/destination/${destination.planet}/${destination.planet}_1.jpg`,
                                            `/destination/${destination.planet}/${destination.planet}_2.jpg`,
                                            `/destination/${destination.planet}/${destination.planet}_3.jpg`,
                                        ]}
                                    />
                                </div>
                                <div className={styles.textDiv}>
                                    <h2>{`${destination.planet} - ${destination.city}`}</h2>
                                    <p className={styles.textP}>{destination.text}</p>
                                    <p className={styles.price}>Price: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(destination.price)}</p>
                                    <button
                                        className={styles.purchButton}
                                        onClick={PurchaseButton}
                                    >
                                        Purchase A Ticket Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading destinations...</p>
            )}

            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        disabled={currentPage === index + 1}
                        className={currentPage === index + 1 ? styles.active : ""}
                    >
                        Page {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default DestCard;
