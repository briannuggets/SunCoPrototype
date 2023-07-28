"use client";

import styles from "./styles.module.scss";

const Hero = () => {
  const device = window.innerWidth < 1024 ? "/mobile" : "/desktop";
  return (
    <div className={`${styles.hero} flex-center-column`}>
      <img src={`${device}/hero.png`} />
      <div className={`flex-center-column ${styles.heroContent}`}>
        <h2>25% OFF</h2>
        <h1>Summer Sale</h1>
        <h3>Discover our summer styles with discount</h3>
        <button className="black-button">Shop Now</button>
      </div>
    </div>
  );
};

export default Hero;
