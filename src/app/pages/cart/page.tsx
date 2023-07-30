import styles from "./styles.module.scss";
import CartClient from "@/app/components/cart-client/CartClient";

const getProducts = async () => {
  "use server";
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  ).then((res) => {
    return res.json();
  });
  return data;
};

const Cart = async () => {
  const products = await getProducts();
  return (
    <div className={`${styles.cart} page`}>
      <CartClient products={products} />
    </div>
  );
};

export default Cart;
