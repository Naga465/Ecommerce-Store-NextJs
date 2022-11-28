import { useCallback, useMemo, useState } from "react";
import { dynamicCategoryList } from "../services/product";
import { CategoryKey, Filter, Product } from "../types";

type State = {
  initProducts: Product[];
  initFilters: Filter | null;
};

function useProducts({ initFilters, initProducts }: State) {
  const [filters, setFilters] = useState(initFilters);

  const resetFilter = useCallback(() => {
    setFilters(initFilters);
  }, [initFilters]);

  const filteredProducts = useMemo(() => {
    if (!filters || !Object.keys(filters).length) return initProducts;
    return initProducts.filter((product) => {
      return (Object.keys(filters) as CategoryKey[]).every((category) => {
        if (!filters[category]?.size) return true; // If list has an empty
        if (category === "price") {
          // Dynamic list validation
          return Boolean(
            Array.from(filters.price || []).find((priceLabel) => {
              const categoryFieldData =
                dynamicCategoryList.price?.extraCategories?.find(
                  (_cat) => _cat.label === priceLabel
                );
              if (!!categoryFieldData) {
                const { min, max } = categoryFieldData;
                return product.price >= min && product.price <= max;
              }
              return false;
            })
          );
        }
        return Boolean(
          Array.from(filters[category] || []).find(
            (item) => item === product[category]
          )
        );
      });
    });
  }, [filters, initProducts]);

  return {
    filters,
    setFilters,
    products: filteredProducts,
    resetFilter,
  };
}

export default useProducts;
