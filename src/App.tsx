import React, { useEffect } from "react";
import Product from "./components/product/Product";

function App() {
  useEffect(() => {
    document.title = 'Qopla Product Checkout';
  }, []);

  return (
    <div className="h-screen bg-bg-image bg-cover bg-fixed bg-center bg-no-repeat flex items-center justify-center pb-[env(safe-area-inset-bottom)]">
      <Product />
    </div>
  );
}

export default App;
