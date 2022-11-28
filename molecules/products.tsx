import { Product } from "../types";
import styles from "../styles/molecules/Product.module.css";
import { FC } from "react";
import { CartButton } from "./buttons";
import { checkProductInStock, getName, getPrice } from "../services/product";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const inStock = checkProductInStock(product);
  return (
    <div
      className={`${styles["product"]} ${
        !inStock ? styles["product__out_of_stock"] : ""
      }`}
    >
      <img alt={product.name} src={product.imageURL} />
      <p className={`${styles["product-attr"]}`}>{getName(product)}</p>
      <p className={`${styles["product-attr"]} ${styles["product-price"]}`}>
        {getPrice(product)}
      </p>
      <div className={styles.product_overlay}>
        <div className={styles.product_addcart}>
          <CartButton product={product} />
        </div>
      </div>
    </div>
  );
};

const Products: FC<{ products: Product[] }> = ({ products }) => {
  if (!products.length)
    return (
      <div className={`${styles.products} ${styles.empty}`}>
        No products found.
      </div>
    );
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
