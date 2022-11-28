import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkProductInCart, checkProductInStock } from "../services/product";
import { RootState } from "../store";
import { addToCart, CartState } from "../store/reducers/cart";
import styles from "../styles/molecules/Buttons.module.css";
import { Product } from "../types";

type CartButtoProps = {
  product: Product;
};
export const CartButton: FunctionComponent<CartButtoProps> = ({ product }) => {
  const { items: cartItems } = useSelector<RootState, CartState>((state) => ({
    ...state.cart,
  }));
  const dispatch = useDispatch();
  const router = useRouter();
  const productInCart = checkProductInCart(product, cartItems);
  const isProductInStock = checkProductInStock(product);

  const onAddToCart = (product: Product): void => {
    if (!isProductInStock) return; // outof stock
    if (productInCart) {
      router.push("/cart"); // view cart
      return;
    }
    dispatch(addToCart({ ...product, selectedQuantity: 1 }));
  };
  return (
    <div
      onClick={() => onAddToCart(product)}
      className={`${styles.cart} ${
        !isProductInStock
          ? styles.card_out_of_stock
          : productInCart
          ? styles.cart_view
          : styles.cart_add
      }`}
    >
      {isProductInStock
        ? productInCart
          ? "Go to Cart"
          : "Add to Cart"
        : "Out of Stock"}
    </div>
  );
};
