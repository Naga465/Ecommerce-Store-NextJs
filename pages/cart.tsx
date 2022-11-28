import Link from "next/link";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../molecules/Layout";
import { getPriceForSelectedQuantity, getTotalAmount } from "../services/cart";
import { getName, getPrice } from "../services/product";
import { RootState } from "../store";
import {
  CartProduct,
  CartState,
  removeFromCart,
  updateCart,
} from "../store/reducers/cart";
import styles from "../styles/Cart.module.css";

const Cart: FC<{}> = () => {
  const { items } = useSelector<RootState, CartState>(({ cart }) => ({
    ...cart,
  }));
  const dispatch = useDispatch();
  const onIncreaseQuantity = (product: CartProduct) => () => {
    const selectedQuantity = product.selectedQuantity + 1;
    if (selectedQuantity <= product.quantity) {
      dispatch(updateCart({ ...product, selectedQuantity }));
    }
  };
  const onDecreaseQuantity = (product: CartProduct) => () => {
    const selectedQuantity = product.selectedQuantity - 1;
    if (selectedQuantity >= 1) {
      dispatch(updateCart({ ...product, selectedQuantity }));
    }
  };
  const onRemoveFromCart = (product: CartProduct) => () =>
    dispatch(removeFromCart(product));

  const EmptyCartContaier = (): JSX.Element => {
    return (
      <div className={styles.cart_empty}>
        <p>No products in cart.</p>
        <Link href="/">
          <div className={styles.goto_products}>Go to Products</div>
        </Link>
      </div>
    );
  };

  return (
    <Layout title="Cart">
      <div className={styles.cart}>
        {!items.length ? (
          <EmptyCartContaier />
        ) : (
          <div>
            <h1>Your Order</h1>
            <div className={styles.cart_items}>
              {items.map((product) => (
                <div key={product.id} className={styles.product}>
                    <img className={styles.product_icon} src={product.imageURL} />
                    <div className={styles.product_feature}>
                      <div className={styles.product_info}>
                          <span className={styles.product__name}>
                            {getName(product)}
                          </span>
                          <span className={styles.product__price}>
                            {`Price: ${getPrice(product)}`}
                          </span>
                          <span className={styles.product__price}>
                            {`Stock: ${product.quantity}`}
                          </span>
                      </div>
                      <div className={styles.product_actions}>
                        <div className={styles.product_quantity}>
                          <img
                            onClick={onDecreaseQuantity(product)}
                            alt="minus"
                            src="/minus.png"
                          />
                          <span>{product.selectedQuantity}</span>
                          <img
                            onClick={onIncreaseQuantity(product)}
                            alt="plus"
                            src="/plus.png"
                          />
                        </div>
                        <span className={styles.product_amount}>
                          {getPriceForSelectedQuantity(product)}
                        </span>
                      </div>
                  </div>
                  <img
                    onClick={onRemoveFromCart(product)}
                    className={styles.product_remove_icon}
                    alt="cancel"
                    src="/cancel.png"
                  />
                </div>
              ))}
            </div>
            <p className={styles.total_price}>{`Total: ${getTotalAmount(
              items
            )}`}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
