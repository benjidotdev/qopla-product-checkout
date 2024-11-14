import React from "react";
import { ReactComponent as ErrorIcon } from "../../../assets/icons/error.svg";

const ErrorIndicator = ({ error }: { error: string }) => {
  return (
    <div className="bg-white w-full max-w-4xl flex flex-col items-center justify-center rounded-xl shadow-2xl p-6 gap-6">
      <ErrorIcon className="mt-6 w-24 h-24 mb-4" />
      <div className="text-center flex flex-col gap-2">
        <div className="text-4xl font-bold">Something&apos;s gone wrong!</div>
        <div>We&apos;ve notified HQ and they will look in to it immediately</div>
      </div>
      <pre className="w-full bg-gray-100 p-4 rounded-md text-sm text-center text-red-500 whitespace-pre-wrap">
        <code>{error}</code>
      </pre>
    </div>
  );
};

export default ErrorIndicator;
