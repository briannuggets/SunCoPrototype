"use client";

import styles from "./styles.module.scss";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface GalleryProps {
  id: number;
  name: string;
}

const Gallery = ({ id, name }: GalleryProps) => {
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

  const [current, setCurrent] = useState(0);
  const progressRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (progressRef.current) {
      const indicators = progressRef.current.children;
      for (let i = 0; i < indicators.length; i++) {
        if (i === current) {
          indicators[i].classList.add("current");
        } else {
          indicators[i].classList.remove("current");
        }
      }
    }
  }, [progressRef, current]);

  return (
    <div className={styles.gallery}>
      <Image
        src={`${device}/products/rect/product-${id}/${current}.png`}
        alt={`${name} shoes`}
        className="image-format"
        width={
          window.innerWidth >= 768 ? window.innerWidth / 2 : window.innerWidth
        }
        height={400}
      />
      <div className={`${styles.galleryControls} flex-center-split`}>
        <button
          className="chevron-button"
          onClick={() => {
            if (current <= 0) return;
            setCurrent(current - 1);
          }}
        >
          <img src="/icons/misc/chevron-left.svg" />
        </button>
        <ul className={"progress-indicator flex-center"} ref={progressRef}>
          <li className="current" />
          <li />
          <li />
        </ul>
        <button
          className="chevron-button"
          onClick={() => {
            if (current >= 2) return;
            setCurrent(current + 1);
          }}
        >
          <img src="/icons/misc/chevron-right.svg" />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
