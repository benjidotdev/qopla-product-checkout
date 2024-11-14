import React, { useState } from "react";
import useProduct from "../../hooks/useProduct";
import LoadingIndicator from "../indicators/loading-indicator/LoadingIndicator";
import ErrorIndicator from "../indicators/error-indicator/ErrorIndicator";
import ProgressBar from "./progress-bar/ProgressBar";

const Soda = () => {
  const { product, additionalData, loading, error } = useProduct({ id: "a_very_unique_soda_id" });
  const [step, setStep] = useState(1);

  console.log({ product, additionalData, loading, error });

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-6">
      <ProgressBar currentStep={step} />
    </div>
  );
};

export default Soda;
