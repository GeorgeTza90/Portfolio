import type { JSX } from "react";
import { useState, useEffect } from 'react';
import styles from './carousel.module.css';

interface CarouselProps {
  images: string[];
}

function Carousel({ images }: CarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const getRandomInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, getRandomInterval(2000, 5000));
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carousel}>
      {/* <button onClick={prevSlide} className={styles.leftArrow} aria-label="Previous Slide">
        ‹
      </button> */}
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className={styles.image} />
      {/* <button onClick={nextSlide} className={styles.rightArrow} aria-label="Next Slide">
        ›
      </button> */}
    </div>
  );
}

export default Carousel;
