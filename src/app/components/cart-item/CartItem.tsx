"use client";

import Product from "@/app/types/product";

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  return (
    <div>
      <p>{`${product.brand}, ${product.name} (${product.id}): ${quantity}`}</p>
    </div>
  );
};

export default CartItem;
