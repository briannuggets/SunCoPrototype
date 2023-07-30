"use client";

import styles from "./styles.module.scss";
import Product from "@/app/types/product";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface CartItemProps {
  product: Product;
  quantity: number;
  subtotal: number;
  setSubTotal: React.Dispatch<React.SetStateAction<number>>;
}

const CartItem = ({
  product,
  quantity,
  subtotal,
  setSubTotal,
}: CartItemProps) => {
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

  // @desc Increment/decrement quantity
  //       Update localStorage to reflect changes
  //       Update subtotal
  // @param increment: true if incrementing, false if decrementing
  // @return void
  const quantityRef = useRef<HTMLInputElement>(null);
  const handleQuantity = (increment: boolean) => {
    if (quantityRef.current) {
      const modifier = increment ? 1 : -1;
      const current = parseInt(quantityRef.current.value);

      if (current + modifier < 1) {
        return;
      }
      const newValue = current + modifier;
      quantityRef.current.value = newValue.toString();

      const cartObj = JSON.parse(localStorage.getItem("cart") || "{}");
      cartObj[product.id] = newValue;
      localStorage.setItem("cart", JSON.stringify(cartObj));
      setSubTotal(subtotal + product.price * modifier);
    }
  };

  // @desc Validate input when user types in quantity
  //       Update localStorage to reflect changes
  //       Update subtotal
  // @return void
  const checkInput = () => {
    if (quantityRef.current === null) return;

    const value = parseInt(quantityRef.current.value);
    const cartObj = JSON.parse(localStorage.getItem("cart") || "{}");
    const difference = value - cartObj[product.id];
    if (value === 0) {
      const cartItem = quantityRef.current.closest(".cart-item");
      if (cartItem) {
        cartItem.remove();
      }
      delete cartObj[product.id];
      localStorage.setItem("cart", JSON.stringify(cartObj));
    } else {
      cartObj[product.id] = value;
      localStorage.setItem("cart", JSON.stringify(cartObj));
    }
    setSubTotal(subtotal + product.price * difference);
  };

  // @desc Delete item from cart
  //       Update localStorage to reflect changes
  //       Update subtotal
  // @return void
  const deleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const cartObj = JSON.parse(localStorage.getItem("cart") || "{}");
    const _quantity = cartObj[product.id];
    const cartItem = e.currentTarget.closest(".cart-item");
    if (cartItem) {
      cartItem.remove();
    }
    delete cartObj[product.id];
    localStorage.setItem("cart", JSON.stringify(cartObj));
    setSubTotal(subtotal - product.price * _quantity);
  };

  return (
    <div className={`${styles.cartItem} cart-item`}>
      <Link href={`product/${product.id}`}>
        <Image
          className="image-format"
          src={`${device}/products/square/${product.id}.png`}
          alt={`${product.name} shoes`}
          width={150}
          height={150}
        />
      </Link>
      <div className={styles.cartItemDetails}>
        <div className="flex-center-split">
          <p>{product.brand}</p>
          <p>{`$${product.price}`}</p>
        </div>
        <p>{product.name}</p>
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
          <input
            type="number"
            defaultValue={quantity}
            ref={quantityRef}
            min={1}
            onBlur={checkInput}
          />
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
        <button onClick={deleteItem}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
