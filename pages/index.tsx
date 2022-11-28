import type { NextPage } from "next";
import { useState } from "react";
import useProducts from "../hooks/product";
import Filters from "../molecules/filters";
import Layout from "../molecules/Layout";
import Products from "../molecules/products";
import {
  dynamicCategoryList,
  filterList,
  initialiseWithFilterData,
} from "../services/product";
import styles from "../styles/Home.module.css";
import { CategoryKey, Product } from "../types";
import { debounce } from "../utils";

const categories: { name: string; key: keyof Product }[] = [
  {
    name: "Color",
    key: "color",
  },
  {
    name: "Gender",
    key: "gender",
  },
  {
    name: "Type",
    key: "type",
  },
];

type Props = {
  products: Product[];
};

const Home: NextPage<Props> = (props) => {
  const { filters, setFilters, products } = useProducts({
    initFilters: null,
    initProducts: props.products,
  });
  const [searchKeyword, setSearchKeyWord] = useState<string>("");

  const onApplyFilter = (value: any, categoryKey: CategoryKey): void => {
    const list = filters?.[categoryKey] ?? new Set();
    if (list.has(value)) {
      list.delete(value);
    } else {
      list.add(value);
    }
    setFilters((prev) => ({
      ...(prev || {}),
      [categoryKey]: list,
    }));
  };

  const onSearch = debounce(
    (e: any): void => setSearchKeyWord(e.target.value),
    500
  );

  return (
    <Layout onSearch={onSearch} title="Products">
      <div className={styles.portal}>
        <Filters
          categories={{
            ...initialiseWithFilterData(props.products, categories),
            ...dynamicCategoryList,
          }}
          onApplyFilter={onApplyFilter}
          filters={filters}
        />
        <Products products={filterList(products, searchKeyword)} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const response = await fetch(
    `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`,
    { method: "GET" }
  );
  const products: Product[] = await response.json();

  return { props: { products } };
}

export default Home;
