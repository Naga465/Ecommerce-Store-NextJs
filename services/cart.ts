import { CartProduct } from "../store/reducers/cart";
import { formatCurrency } from "./product";

export const getTotalAmount = (list: CartProduct[]): string => {
  if (!list.length) {
    return ``;
  }
  const totalAmount = list.reduce(
    (acc, item) => acc + item.price * item.selectedQuantity,
    0
  );
  return formatCurrency(totalAmount, list[0].currency);
};
export const getPriceForSelectedQuantity = (product: CartProduct): string => {
  const amount = product.price * (product.selectedQuantity ?? 1);
  return formatCurrency(amount, product.currency);
};
