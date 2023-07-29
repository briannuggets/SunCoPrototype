"use client";

import styles from "./styles.module.scss";
import { useRef } from "react";

interface AddToCartProps {
  id: string;
  brand: string;
  name: string;
  price: string;
}

const AddToCart = ({ id, brand, name, price }: AddToCartProps) => {
  const quantityRef = useRef<HTMLInputElement>(null);

  const handleQuantity = (increment: boolean) => {
    if (quantityRef.current) {
      const modifier = increment ? 1 : -1;
      const current = parseInt(quantityRef.current.value);

      if (current + modifier < 0) {
        return;
      }
      quantityRef.current.value = (
        parseInt(quantityRef.current.value) + modifier
      ).toString();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (quantityRef.current === null) return;

    const quantity = parseInt(quantityRef.current.value);
    const cart = localStorage.getItem("cart") || "{}";
    const cartObj = JSON.parse(cart);

    if (cartObj[id]) {
      cartObj[id] += quantity;
    } else {
      cartObj[id] = quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cartObj));
    console.log("Added to cart!");
  };

  return (
    <div className={styles.addToCart}>
      <div className={`${styles.details} flex-center-column`}>
        <h1>{brand}</h1>
        <h2>{name}</h2>
        <p>{`$${price}`}</p>
      </div>
      <div className={styles.addPanel}>
        <p>Quantity</p>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.quantityController} flex-center`}>
            <button
              type="button"
              className="flex-center"
              onClick={() => {
                handleQuantity(false);
              }}
            >
              <img src="/icons/misc/minus.svg" />
            </button>
            <input type="number" defaultValue="1" ref={quantityRef} min={1} />
            <button
              type="button"
              className="flex-center"
              onClick={() => {
                handleQuantity(true);
              }}
            >
              <img src="/icons/misc/plus.svg" />
            </button>
          </div>
          <button type="submit" className="black-button">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToCart;
