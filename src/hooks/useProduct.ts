import React, { useState, useEffect, useRef } from "react";
import { getProduct } from "../modules/product";
import { Flavour, Size, SelectedAddOnGroup, Product, AdditionalData } from "../types/products";

interface UseProductOptions {
  id: string;
}

interface UseProductResponse {
  product: Product | null;
  additionalData: AdditionalData[] | null;
  loading: boolean;
  error: string | null;
  currentStep: number;
  setCurrentStep: (step: React.SetStateAction<number>) => void;
  selectedSize: Size;
  setSelectedSize: (size: Size) => void;
  selectedFlavour: Flavour;
  setSelectedFlavour: (flavour: Flavour) => void;
  selectedAddOns: SelectedAddOnGroup[];
  setSelectedAddOns: (addons: SelectedAddOnGroup[]) => void;
  totalPrice: number;
  totalSteps: number;
  setTotalSteps: (steps: number) => void;
  isBackTransition: boolean;
  setIsBackTransition: (isBack: boolean) => void;
  basePriceRef: React.MutableRefObject<number>;
}

const useProduct = ({ id }: UseProductOptions): UseProductResponse => {
  const [product, setProduct] = useState<Product | null>(null);
  const [additionalData, setAdditionalData] = useState<AdditionalData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<Size>({ name: "", addonPrice: 0 });
  const [selectedFlavour, setSelectedFlavour] = useState<Flavour>({ name: "", addonPrice: 0 });
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOnGroup[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [isBackTransition, setIsBackTransition] = useState<boolean>(false);
  const basePriceRef = useRef<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProduct(id);
        setProduct(response.product ?? null);
        setAdditionalData(response.additionalData ?? null);

        // Set initial data
        if (response.product) {
          basePriceRef.current = response.product.price;
          setSelectedSize(response.product.modifications.sizes[0]);
          setSelectedFlavour(response.product.modifications.flavours[0]);
          setTotalPrice(response.product.price);
          setTotalSteps(response.additionalData ? 3 : 2);
        }
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

  // Update total price
  useEffect(() => {
    if (product) {
      const sizeAddonPrice = product.modifications.sizes.find(size => size.name === selectedSize.name)?.addonPrice || 0;
      const assortedAddOnPrice = selectedAddOns.reduce((acc, group) => {
        return acc + group.addons.reduce((addonAcc, addon) => addonAcc + addon.price, 0);
      }, 0);
      setTotalPrice(basePriceRef.current + sizeAddonPrice + assortedAddOnPrice);
    }
  }, [product, selectedSize, selectedAddOns]);

  return {
    product,
    additionalData,
    loading,
    error,
    currentStep,
    setCurrentStep,
    selectedSize,
    setSelectedSize,
    selectedFlavour,
    setSelectedFlavour,
    selectedAddOns,
    setSelectedAddOns,
    totalPrice,
    totalSteps,
    setTotalSteps,
    isBackTransition,
    setIsBackTransition,
    basePriceRef,
  };
};

export default useProduct;
