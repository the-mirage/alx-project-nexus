import { StaticImageData } from "next/image";

export interface NavItemsProps {
  navOpen?: boolean;
  setNavOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

// export interface ProductProps {
//   id: number;
//   name: string;
//   price: number;
//   discount?: number;
//   image: string | StaticImageData;
//   discountedPrice?: number;
//   category?: string;
//   description: string;
// }

export type ProductProps = {
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
};
export interface ProductListProps {
  products: ProductProps[];
  quantity?: number | undefined;
}
