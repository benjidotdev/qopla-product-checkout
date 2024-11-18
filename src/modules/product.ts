import { Product, AdditionalData } from "../types/products";
import errorHandler from "../utils/error-handler";
import { mockProductData } from "../data/mock-product-data";
import { DELAY, FAIL_RATE } from "../constants";

interface GetProductResponse {
  product: Product;
  additionalData: AdditionalData[];
}

type PartialGetProductResponse = Partial<GetProductResponse>;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const failRandomly = Math.random() < FAIL_RATE;

const getProduct = async (id: string): Promise<PartialGetProductResponse> => {
  try {
    if (!id) {
      errorHandler(new Error("Product ID is required"));
    }

    await delay(DELAY);

    if (failRandomly) {
      errorHandler(new Error("Mock API request failed"));
    }

    return mockProductData;
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(error);
    } else {
      errorHandler(new Error("Unknown error"));
    }
    throw error;
  }
};

export { getProduct };
