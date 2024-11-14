import React from "react";
import useProduct from "../../hooks/useProduct";

const Soda = () => {
  const { product, additionalData, loading, error } = useProduct({ id: "a_very_unique_soda_id" });

  console.log({ product, additionalData, loading, error });

  return <div>Soda</div>;
};

export default Soda;
