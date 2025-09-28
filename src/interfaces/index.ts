import { StaticImageData } from "next/image";

export interface NavItemsProps {
  navOpen?: boolean;
  setNavOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProductProps {
  id: number;
  title?: string;
  name?: string | undefined;
  price: number;
  discountPercentage?: number;
  discount?: number;
  discountedPrice?: number;
  category: string;
  description: string;
  thumbnail?: string;
  image?: string | StaticImageData;
  images?: string[];
  brand?: string;
  stock?: number;
  rating?: number;
  quantity?: number;
}
export interface ProductListProps {
  products: ProductProps[];
  quantity?: number | undefined;
}

export interface CartItemsProp {
  product: ProductProps;
}
