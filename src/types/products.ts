export interface Product {
  id: string;
  name: string;
  price: number;
  modifications: {
    sizes: { name: string; addonPrice: number }[];
    flavours: { name: string; addonPrice: number }[];
  };
}

export interface AdditionalData {
  name: string;
  limit: number;
  sortOrder: number;
  refProductIds: string[];
  addons: {
    addon: { name: string; price: number };
    limit: number;
    sortOrder: number;
  }[];
}
