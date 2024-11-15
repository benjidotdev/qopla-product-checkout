import { useState, useEffect } from "react";
import { getProduct } from "../modules/product";
import { AdditionalData, Product } from "../types/products";

interface UseProductOptions {
  id: string;
}

interface UseProductResponse {
  product: Product | null;
  additionalData: AdditionalData[] | null;
  loading: boolean;
  error: string | null;
}

const useProduct = ({ id }: UseProductOptions): UseProductResponse => {
  const [product, setProduct] = useState<Product | null>(null);
  const [additionalData, setAdditionalData] = useState<AdditionalData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProduct(id);
        setProduct(response.product ?? null);
        setAdditionalData(response.additionalData ?? null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown Error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, additionalData, loading, error };
};

export default useProduct;
