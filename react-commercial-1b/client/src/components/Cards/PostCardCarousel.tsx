// Carousel.tsx
import { useState, forwardRef, useImperativeHandle } from "react";
import type { ReactNode } from "react";
import styles from "./carousel.module.css";

interface CarouselProps {
  children: ReactNode[];
}

const Carousel = forwardRef(( { children }: CarouselProps, ref) => {
  const [current, setCurrent] = useState(0);
  const total = children.length;

  const nextSlide = () => setCurrent((current + 1) % total);
  const prevSlide = () => setCurrent((current - 1 + total) % total);

  useImperativeHandle(ref, () => ({
    next: nextSlide,
    prev: prevSlide,
  }))

  if (!children || total === 0) return <div>No items to display</div>;

  return (
    <div className={styles.carouselContainer}>      
      <div className={styles.carouselSlide}>
        {children[current]}
      </div>
    </div>
  );
});

export default Carousel;
