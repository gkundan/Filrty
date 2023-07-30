import React, { useState } from "react";
import "./Search.css";
import MetaData from "../layouts/MetaData";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      window.location.href = `/products/${keyword}`;
    } else {
      window.location.href = "/products";
    }
  };

  return (
    <>
      <MetaData title="Find Your Products --- Flirty" />
      <form className="SearchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
