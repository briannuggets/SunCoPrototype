"use client";

import styles from "./styles.module.scss";
import Product from "@/app/types/product";
import { useEffect, useState } from "react";

const CarouselItem = ({ id, brand, name, price }: Product) => {
  const [device, setDevice] = useState("/mobile");
  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth > 768) {
        setDevice("/desktop");
      } else {
        setDevice("/mobile");
      }
    };

    checkDevice();
    window.addEventListener("resize", () => {
      checkDevice();
    });
  }, []);

  return (
    <a
      className={`${styles.carouselItem} flex-center-column`}
      href={`/pages/product/${id}`}
    >
      <img src={`${device}/products/square/${id}.png`} draggable={false} />
      <h3>{brand}</h3>
      <p>{name}</p>
      <p>${price}</p>
    </a>
  );
};

export default CarouselItem;
