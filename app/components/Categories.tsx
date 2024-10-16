"use client";

import { useState } from "react";
import CategorySelect from "./CategorySelect";

const Categories = () => {
  const [dataCategory, setDataCategory] = useState("");
  const setCategory = (wing: string) => {
    setDataCategory(wing);
  };
  return (
    <>
      <CategorySelect
        dataCategory={dataCategory}
        setCategory={(category) => setCategory(category)}
      />
      <div>Test</div>
    </>
  );
};

export default Categories;
