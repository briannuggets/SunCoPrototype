"use client";

import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";

interface CustomStorageEvent extends Event {
  value: any;
  key: string;
}

const Header = () => {
  const [quantity, setQuantity] = useState(0);
  const retrieveQuantity = (cart: string) => {
    if (cart) {
      const cartObj = JSON.parse(cart);
      const keys = Object.keys(cartObj);
      let total = 0;
      for (const key of keys) {
        total += cartObj[key];
      }
      return total;
    }
    return 0;
  };

  // Update cart quantity each time localStorage is updated
  // https://stackoverflow.com/questions/26974084/listen-for-changes-with-localstorage-on-the-same-window
  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event: CustomStorageEvent = new Event(
        "itemInserted"
      ) as CustomStorageEvent;
      event.value = value;
      event.key = key;
      document.dispatchEvent(event);
      originalSetItem.apply(this, [key, value]);
    };

    const localStorageSetHandler = function (e: any) {
      const cart = e.value;
      setQuantity(retrieveQuantity(cart));
    };

    document.addEventListener("itemInserted", localStorageSetHandler, false);
  }, []);

  useEffect(() => {
    const cart = localStorage.getItem("cart") || "{}";
    setQuantity(retrieveQuantity(cart));
  }, [setQuantity]);

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
