import { StaticImageData } from "next/image";

export interface NavItemsProps {
  navOpen?: boolean;
  setNavOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  image: string | StaticImageData;
  discountedPrice?: number;
  category?: string;
  description: string;
}

export interface ProductListProps {
  products: Product[];
}
