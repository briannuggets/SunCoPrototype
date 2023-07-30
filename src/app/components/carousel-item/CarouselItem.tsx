"use client";

import styles from "./styles.module.scss";
import Product from "@/app/types/product";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CarouselItem = ({ id, brand, name, price }: Product) => {
  const [device, setDevice] = useState("/mobile");
  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth >= 768) {
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
    <Link
      className={`${styles.carouselItem} flex-center-column`}
      href={`/pages/product/${id}`}
    >
      <div>
        <Image
          src={`${device}/products/square/${id}.png`}
          draggable={false}
          className="image-format"
          width={window.innerWidth >= 768 ? 500 : 250}
          height={window.innerWidth >= 768 ? 500 : 250}
          alt={`${name} shoes`}
        />
      </div>
      <h3>{brand}</h3>
      <p>{name}</p>
      <p>${price}</p>
    </Link>
  );
};

export default CarouselItem;
