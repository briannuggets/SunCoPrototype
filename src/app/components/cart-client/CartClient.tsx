"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import CartItem from "../cart-item/CartItem";
import Product from "@/app/types/product";

interface CartClientProps {
  products: Product[];
}

const CartClient = ({ products }: CartClientProps) => {
  // Retrieve cart from local storage
  const [cart, setCart] = useState<Record<string, string>>({});
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "{}"));
  }, [setCart]);

  // Calculate subtotal from cart
  const [subtotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    Object.keys(cart).forEach((item) => {
      total += parseInt(cart[item]) * products[parseInt(item)].price;
    });
    setSubTotal(total);
  }, [cart, products]);

  return (
    <>
      <div className={`${styles.cartSummary}`}>
        <h1>Summary</h1>
        <div className={`${styles.cartPricing} flex-center`}>
          <div className="flex-center-column">
            <p>Subtotal</p>
            <p>Shipping and delivery</p>
            <p>Tax</p>
            <p>Discount</p>
          </div>
          <div className="flex-center-column">
            <p>{`$${subtotal.toFixed(2)}`}</p>
            <p>{`$${subtotal > 0 ? "20.00" : "0.00"}`}</p>
            <p>{`$${(subtotal * 0.06).toFixed(2)}`}</p>
            <p className="highlight">{`-$${subtotal > 0 ? "6.00" : "0.00"}`}</p>
          </div>
        </div>
        <div className={`${styles.cartCheckout}`}>
          <div className="flex-center-split">
            <p>Total</p>
            <p>
              {subtotal > 0
                ? `$${(subtotal * 1.06 + 20 - 6).toFixed(2)}`
                : "$0.00"}
            </p>
          </div>
          <button className="black-button">
            Checkout&nbsp;
            <img src="/icons/misc/arrow-right.svg" alt="Right arrow" />
          </button>
        </div>
      </div>
      <div className={`${styles.cartItems}`}>
        <h2>Your Bag</h2>
        {Object.keys(cart).length === 0 ? (
          <p style={{ marginTop: "1.5rem" }}>No items in your bag.</p>
        ) : (
          Object.keys(cart).map((item, index) => {
            return (
              <CartItem
                key={index}
                product={products[parseInt(item)]}
                quantity={parseInt(cart[item])}
                subtotal={subtotal}
                setSubTotal={setSubTotal}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default CartClient;
