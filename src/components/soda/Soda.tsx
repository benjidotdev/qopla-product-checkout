import React from "react";
import useProduct from "../../hooks/useProduct";
import LoadingIndicator from "../indicators/loading/Loading";
import ErrorIndicator from "../indicators/error/Error";

const Soda = () => {
  const { product, additionalData, loading, error } = useProduct({ id: "a_very_unique_soda_id" });

  console.log({ product, additionalData, loading, error });

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-6">Soda</div>
  );
};

export default Soda;
