import styles from "./styles.module.scss";
import CartClient from "@/app/components/cart-client/CartClient";
import { getProducts } from "@/app/api/utils";

const Cart = async () => {
  const products = await getProducts();
  return (
    <div className={`${styles.cart} page`}>
      <CartClient products={products} />
    </div>
  );
};

export default Cart;
