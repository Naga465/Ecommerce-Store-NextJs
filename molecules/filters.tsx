import Image from "next/image";
import React, { FC, useState } from "react";
import { formatCurrency, getPrice } from "../services/product";
import styles from "../styles/molecules/Filters.module.css";
import { Category, CategoryKey, Filter, FilterInfo } from "../types";
import SearchInput from "./search";

interface Props {
  filters: null | Filter;
  onApplyFilter?: (filter: any, categoryKey: CategoryKey) => void;
  onClearFilter?: (filter: any, categoryKey: CategoryKey) => void;
  onRest?: () => void;
  categories: Category;
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
}

const CategoryTitle: FC<{
  open: boolean;
  category: Category[CategoryKey];
  onSelectCategory?: (key: CategoryKey) => void;
}> = ({ category, onSelectCategory = () => {}, open }) => {
  if (!category) return null;
  return (
    <div className={styles.category}>
      <div className={styles.title}>{category.name.toUpperCase()}</div>
      <Image
        onClick={() => onSelectCategory(category.key)}
        src={open ? "/minus.png" : "/plus.png"}
        height={24}
        width={24}
      />
    </div>
  );
};

const Filters: FC<Props> = ({ categories, filters, ...props }) => {
  const [filterCatgegories, setFilterCatgegories] = useState<CategoryKey[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const onHandleChange =
    ({ filter, categoryKey }: any) =>
    (e: React.FormEvent<HTMLInputElement>) => {
      if (!props.onApplyFilter) return;
      props.onApplyFilter(filter, categoryKey);
    };

  const onSelectCategory = (key: CategoryKey) => {
    const index = filterCatgegories.findIndex((_key) => _key === key);
    if (index !== -1) {
      /* Unselect the filter */
      setFilterCatgegories((prev) => prev.filter((_key) => key !== _key));
      return;
    }
    setFilterCatgegories((prev) => [...prev, key]);
  };

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const filterContainer = (
    <div className={styles.container}>
      <h2>Filter By</h2>
      <div className={styles.list}>
        {(Object.keys(categories) as CategoryKey[]).map((categoryKey) => {
          const category = categories[categoryKey];
          const isopen = filterCatgegories.includes(categoryKey);
          if (!category) return null;
          return (
            <div key={categoryKey}>
              <CategoryTitle
                open={isopen}
                category={category}
                onSelectCategory={onSelectCategory}
              />
              <div className={isopen ? styles.active : styles.hide}>
                {category.extraCategories?.map((item) => (
                  <div key={item.label}>
                    <input
                      type={"checkbox"}
                      onChange={onHandleChange({
                        filter: item.label,
                        categoryKey,
                      })}
                      checked={
                        !!filters
                          ? Boolean(filters[categoryKey]?.has(item.label))
                          : false
                      }
                    />
                    {`${formatCurrency(item.min, "INR", 0)} - ${formatCurrency(
                      item.max,
                      "INR",
                      0
                    )}`}
                  </div>
                ))}
                {Array.from(category.list).map((filter) => (
                  <div key={filter}>
                    <input
                      type={"checkbox"}
                      onChange={onHandleChange({
                        filter,
                        categoryKey,
                      })}
                      checked={
                        !!filters
                          ? Boolean(filters[categoryKey]?.has(filter))
                          : false
                      }
                    />
                    {filter}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.filters_mobile}>
        <SearchInput onChange={props.onSearch} />
        <img onClick={toggleFilter} src={"/filter.png"} />
        {showFilter && <div className={styles.overlay}>{filterContainer}</div>}
      </div>
      <div className={styles.filters}>{filterContainer}</div>
    </>
  );
};

export default Filters;
