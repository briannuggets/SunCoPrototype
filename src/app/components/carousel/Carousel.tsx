"use client";

import styles from "./styles.module.scss";
import Product from "@/app/types/product";
import CarouselItem from "../carousel-item/CarouselItem";
import { useRef, useEffect, useState } from "react";

interface CarouselProps {
  products: Product[];
}

const Carousel = ({ products }: CarouselProps) => {
  const carouselContent = useRef<HTMLDivElement>(null);

  // ------------------------ Drag Handler ------------------------ //
  const [dragging, setDragging] = useState(false);

  // Touch start/end event listeners
  useEffect(() => {
    if (carouselContent.current === null) {
      return;
    }
    carouselContent.current.addEventListener("touchstart", (e) => {
      if (carouselContent.current === null) {
        return;
      }
      // Save the initial mouse position
      carouselContent.current.dataset.initialx =
        e.touches[0].clientX.toString();
      setDragging(true);
    });
    carouselContent.current.addEventListener("touchend", () => {
      setDragging(false);
    });
  }, []);

  // Touch move event
  useEffect(() => {
    if (carouselContent.current === null) {
      return;
    }

    if (dragging) {
      const initialX = parseInt(
        carouselContent.current.dataset.initialx || "0"
      );
      const previousX = parseFloat(
        carouselContent.current.dataset.previous || "0"
      );
      window.ontouchmove = (e) => {
        if (carouselContent.current === null) {
          return;
        }

        // Add current drag offset to previous drag offset
        let deltaPercentageX =
          (e.touches[0].clientX - initialX) / window.innerWidth + previousX;

        deltaPercentageX = Math.min(Math.max(deltaPercentageX, -1), 0);

        carouselContent.current.animate(
          {
            left: `${deltaPercentageX * -100}%`,
            transform: `translateX(${deltaPercentageX * 100}%)`,
          },
          { duration: 200, fill: "forwards" }
        );

        // Save the current drag offset for the next drag
        carouselContent.current.dataset.save = deltaPercentageX.toString();
      };
    } else {
      window.ontouchmove = null;
      carouselContent.current.dataset.previous =
        carouselContent.current.dataset.save || "0";
    }
  }, [dragging]);

  // @desc Shift the carousel left or right
  // @param left - true if shifting left, false if shifting right
  // @returns void
  const shift = (left: boolean) => {
    if (carouselContent.current === null) {
      return;
    }

    const direction = left ? 0.5 : -0.5;
    const previousX = parseFloat(
      carouselContent.current.dataset.previous || "0"
    );
    const newX = Math.min(Math.max(previousX + direction, -1), 0);

    carouselContent.current.animate(
      {
        left: `${newX * -100}%`,
        transform: `translateX(${newX * 100}%)`,
      },
      { duration: 600, fill: "forwards", easing: "ease-in-out" }
    );
    carouselContent.current.dataset.previous = newX.toString();
  };

  return (
    <div className={styles.carouselContainer} id="carousel-container">
      <h2>Explore our latest drops</h2>
      <div className={styles.carousel}>
        <CarouselItem {...products[0]} />
        <div
          className={styles.carouselContent}
          ref={carouselContent}
          data-initialx="0"
          data-previous="0"
        >
          {products.map((product: Product) => (
            <CarouselItem key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className={styles.carouselController}>
        <button
          className="chevron-button"
          onClick={() => {
            shift(true);
          }}
        >
          <img src="/icons/misc/chevron-left.svg" alt="Chevron left" />
        </button>
        <button
          className="chevron-button"
          onClick={() => {
            shift(false);
          }}
        >
          <img src="/icons/misc/chevron-right.svg" alt="Chevron right" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
