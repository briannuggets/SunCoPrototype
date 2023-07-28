"use client";

import styles from "./styles.module.scss";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [quantity, setQuantity] = useState(0);

  return (
    <nav className="flex-center-split">
      <Link className="logo flex-center" href="/">
        <img src="/icons/misc/logo.svg" alt="Sun Co. logo" />
        <span>SUN CO.</span>
      </Link>
      <Link className={`${styles.viewCart} flex-center`} href="/pages/cart">
        <img src="/icons/misc/shopping-bag.svg" alt="Shopping bag icon" />
        <span>View Cart</span>
        <span
          className={`${styles.cartQuantity} ${quantity < 1 ? "hidden" : ""}`}
        >
          {quantity}
        </span>
      </Link>
    </nav>
  );
};

export default Header;
