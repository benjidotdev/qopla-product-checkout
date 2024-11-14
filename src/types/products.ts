export interface Size {
  name: string;
  addonPrice: number;
}

export interface Flavour {
  name: string;
  addonPrice: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  modifications: {
    sizes: Size[];
    flavours: Flavour[];
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
