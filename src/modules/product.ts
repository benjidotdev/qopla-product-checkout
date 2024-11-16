import { Product, AdditionalData } from "../types/products";
import { mockProductData } from "../data/mock-product-data";

interface GetProductResponse {
  product: Product;
  additionalData: AdditionalData[];
}

type PartialGetProductResponse = Partial<GetProductResponse>;

const getProduct = async (id: string): Promise<PartialGetProductResponse> => {
  if (!id) {
    throw new Error("Product ID is required");
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const failRandomly = Math.random() < 0.2;
      if (failRandomly) {
        reject(new Error("Mock API request failed"));
      } else {
        resolve(mockProductData);
      }
    }, 500);
  });
};

export { getProduct };
