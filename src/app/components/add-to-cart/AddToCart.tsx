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

  // @desc Increase or decrease the number of items in the cart
  // @param increment - true if incrementing, false if decrementing
  // @returns void
  const handleQuantity = (increment: boolean) => {
    if (quantityRef.current) {
      const modifier = increment ? 1 : -1;
      const current = parseInt(quantityRef.current.value);

      if (current + modifier < 1) {
        return;
      }
      quantityRef.current.value = (
        parseInt(quantityRef.current.value) + modifier
      ).toString();
    }
  };

  // @desc Add the item to the cart with changes reflected in localStorage
  // @param e - form event
  // @returns void
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
          <div className={"quantity-controller flex-center"}>
            <button
              type="button"
              className="flex-center"
              onClick={() => {
                handleQuantity(false);
              }}
            >
              <img src="/icons/misc/minus.svg" alt="Remove item" />
            </button>
            <input type="number" defaultValue="1" ref={quantityRef} min={1} />
            <button
              type="button"
              className="flex-center"
              onClick={() => {
                handleQuantity(true);
              }}
            >
              <img src="/icons/misc/plus.svg" alt="Add item" />
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
