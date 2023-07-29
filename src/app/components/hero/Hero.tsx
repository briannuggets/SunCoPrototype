"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

const Hero = () => {
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
    <div className={`${styles.hero} flex-center-column`}>
      <img src={`${device}/hero.png`} />
      <div className={`flex-center-column ${styles.heroContent}`}>
        <h2 className="highlight">25% OFF</h2>
        <h1>Summer Sale</h1>
        <h3>Discover our summer styles with discount</h3>
        <button className="black-button">
          Shop Now&nbsp;
          <img src="/icons/misc/arrow-right.svg" alt="Arrow right" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
