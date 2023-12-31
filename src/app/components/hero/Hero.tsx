"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";

const Hero = () => {
  // Set the device path based on the window width
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
    <div className={`${styles.hero} flex-center-column`}>
      <div>
        <Image
          src={`${device}/hero.png`}
          alt="Hero shoe image"
          width={device === "/desktop" ? 500 : 300}
          height={device === "/desktop" ? 500 : 200}
          className="image-format"
          priority
        />
      </div>
      <div className={`flex-center-column ${styles.heroContent}`}>
        <h2 className="highlight">25% OFF</h2>
        <h1>Summer Sale</h1>
        <h3>Discover our summer styles with discount</h3>
        <a className="black-button" href="#carousel-container">
          Shop Now&nbsp;
          <img src="/icons/misc/arrow-right.svg" alt="Arrow right" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
