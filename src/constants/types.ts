import { PricingOptionEnum } from "./enums";

export type ContentItem = {
  id: string;
  creator: string;
  title: string;
  pricingOption: number;
  imagePath: string;
  price: number;
};

export type FilterConfig = {
  [PricingOptionEnum.PAID]: boolean | undefined;
  [PricingOptionEnum.FREE]: boolean | undefined;
  [PricingOptionEnum.VIEW_ONLY]: boolean | undefined;
  priceRange: number;
  sortBy?: string; // Optional field for sorting
  searchText: string;
};
