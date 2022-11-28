import React, { FC } from "react";
import styles from "../styles/molecules/Search.module.css";

const SearchInput: FC<{
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = (props) => {
  return (
    <div className={styles.search}>
      <input
        type={"text"}
        placeholder={"Search name, color & type"}
        onChange={props.onChange}
      />
    </div>
  );
};
export default SearchInput;
