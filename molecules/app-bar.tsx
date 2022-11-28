import Link, { LinkProps } from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CartState } from "../store/reducers/cart";
import styles from "../styles/molecules/AppBar.module.css";
import SearchInput from "./search";

interface Action extends LinkProps {
  label: string;
}

const AppBar: FC<{
  actions?: Action[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  page: string;
}> = (props) => {
  const { items } = useSelector<RootState, CartState>((state) => ({
    ...state.cart,
  }));
  return (
    <div className={styles.container}>
      <div>
        <Link href={"/"}>
          <h1>TeeRx Store</h1>
        </Link>
        {props.page.toLowerCase() === "products" && (
          <SearchInput onChange={props.onChange} />
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.cart}>
          <Link href={"/cart"}>
            <img alt="cart" src="/trolley.png" />
          </Link>
          <p>{items.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
