import { Category, Product } from "../types";

export function getName(product: Product): string {
  return `${product.name} (${product.gender}-${product.type})`;
}
export function getPrice({ price, currency }: Product): string {
  return formatCurrency(price, currency);
}
export function formatCurrency(
  amount: number,
  currency: string,
  maximumFractionDigits = 2
): string {
  return amount.toLocaleString("en-IN", {
    currency,
    style: "currency",
    maximumFractionDigits,
  });
}
export function checkProductInCart(
  product: Product,
  cartItems: Product[]
): boolean {
  return !!cartItems.find((item) => item.id === product.id);
}

export const initialiseWithFilterData = (
  products: Product[],
  categories: { name: string; key: keyof Product }[]
): Category => {
  return products.reduce((acc: Category, product) => {
    categories.forEach(({ name, key }) => {
      const value = product[key];
      const list = acc?.[key]?.list ?? new Set();
      acc = {
        ...(acc || {}),
        [key]: {
          key,
          name,
          list: list.add(value),
        },
      };
    });
    return acc;
  }, {});
};

export const dynamicCategoryList: Pick<Category, "price"> = {
  price: {
    name: "Price",
    key: "price",
    list: new Set(),
    extraCategories: [
      { min: 0, max: 250, label: `0 - 250` },
      { min: 251, max: 500, label: "251 - 500" },
      { min: 501, max: 10000, label: "> 501" },
    ],
  },
};

/* check availablity of stock */
export const checkProductInStock = (product: Product): Boolean =>
  product.quantity >= 1;

  /* filter products by search keyword */
export const filterList = (list: Product[], searchkey: string): Product[] => {
  const key = searchkey.toLowerCase();
  return list.filter(
    (product) =>
      product.name.toLowerCase().includes(key) ||
      product.color.toLowerCase().includes(key) ||
      product.type.toLocaleLowerCase().includes(key)
  );
};
