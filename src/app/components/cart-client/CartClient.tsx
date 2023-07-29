"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import CartItem from "../cart-item/CartItem";
import Product from "@/app/types/product";

interface CartClientProps {
  products: Product[];
}

const CartClient = ({ products }: CartClientProps) => {
  const [cart, setCart] = useState<Record<string, string>>({});
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "{}"));
  }, [setCart]);

  const [subtotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    Object.keys(cart).forEach((item) => {
      total += parseInt(cart[item]) * products[parseInt(item)].price;
    });
    setSubTotal(total);
  }, [cart]);

  return (
    <>
      <p>{`Subtotal: $${subtotal}`}</p>
      {Object.keys(cart).map((item, index) => {
        return (
          <CartItem
            key={index}
            product={products[parseInt(item)]}
            quantity={parseInt(cart[item])}
          />
        );
      })}
    </>
  );
};

export default CartClient;
