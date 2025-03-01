import { useState, useEffect } from 'react';
import styles from './carousel.module.css';


function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };

    const getRandomInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, getRandomInterval(5000, 15000));
        return () => clearInterval(interval);
    }, []);


    return (
        <div className={styles.carousel}>
            <button onClick={prevSlide} className={styles.leftArrow}>‹</button>
            <img src={images[currentIndex]} alt="carousel" className={styles.image} />
            <button onClick={nextSlide} className={styles.rightArrow}>›</button>
        </div>
    );
}

export default Carousel;