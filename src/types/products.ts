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

export interface AddOnDetails {
  name: string;
  price: number;
}

export interface AddOn {
  addon: AddOnDetails;
  limit: number;
  sortOrder: number;
}

export interface AdditionalData {
  name: string;
  limit: number;
  sortOrder: number;
  refProductIds: string[];
  addons: AddOn[];
}

export interface SelectedAddOnGroup {
  groupTitle: string;
  addons: AddOnDetails[];
}
