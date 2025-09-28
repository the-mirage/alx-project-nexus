import { ProductProps } from "@/interfaces";
import { StaticImageData } from "next/image";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Product
type Product = {
  id: number;
  title?: string;
  name?: string;
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

// Cart item type
type CartItem = {
  id: number;
  name: string;
  price: number;
  discount?: number;
  discountedPrice?: number;
  image: string;
  category: string;
  quantity: number;
};

// Store state type
type ProductStore = {
  // Products
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;

  // Cart
  cartItems: CartItem[];
  cartTotal: number;

  // Filters
  selectedCategory: string;
  sortBy: "name" | "price" | "rating";
  sortOrder: "asc" | "desc";

  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
  setSorting: (
    sortBy: "name" | "price" | "rating",
    order: "asc" | "desc"
  ) => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // Utility actions
  getProductById: (id: number) => Product | undefined;
  getFilteredProducts: () => Product[];
};

// Helper function to normalize
const normalizeProduct = (apiProduct: ProductProps): Product => ({
  id: apiProduct.id,
  title: apiProduct.title ?? "",
  name: apiProduct.title,
  price: apiProduct.price,
  discountPercentage: apiProduct.discountPercentage,
  discount: apiProduct.discountPercentage,
  discountedPrice: apiProduct.discountPercentage
    ? apiProduct.price -
      (apiProduct.price * apiProduct.discountPercentage) / 100
    : apiProduct.price,
  category: apiProduct.category,
  description: apiProduct.description,
  thumbnail: apiProduct.thumbnail,
  image: apiProduct.thumbnail,
  images: (apiProduct.images ?? [apiProduct.thumbnail]).filter(
    (img): img is string => typeof img === "string"
  ),
  brand: apiProduct.brand,
  stock: apiProduct.stock,
  rating: apiProduct.rating,
});

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      featuredProducts: [],
      categories: [],
      isLoading: false,
      error: null,
      cartItems: [],
      cartTotal: 0,
      selectedCategory: "All",
      sortBy: "name",
      sortOrder: "asc",

      // Fetch all products
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            "https://dummyjson.com/products?limit=200"
          );
          if (!response.ok) throw new Error("Failed to fetch products");

          const data = await response.json();
          const normalizedProducts = data.products.map(normalizeProduct);

          // Set featured products (first 6 with high ratings)
          const featured = normalizedProducts
            .filter((p: Product) => (p.rating ?? 0) >= 4.5)
            .slice(0, 6);

          set({
            products: normalizedProducts,
            featuredProducts: featured,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            isLoading: false,
          });
        }
      },

      // Fetch products by category
      fetchProductsByCategory: async (category: string) => {
        if (category === "All") {
          get().fetchProducts();
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `https://dummyjson.com/products/category/${category}`
          );
          if (!response.ok) throw new Error("Failed to fetch products");

          const data = await response.json();
          const normalizedProducts = data.products.map(normalizeProduct);

          set({
            products: normalizedProducts,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            isLoading: false,
          });
        }
      },

      // Fetch categories
      fetchCategories: async () => {
        try {
          const response = await fetch(
            "https://dummyjson.com/products/categories"
          );
          if (!response.ok) throw new Error("Failed to fetch categories");

          const categories = await response.json();
          set({ categories: ["Tops", ...categories] });
        } catch (error) {
          console.error("Failed to fetch categories:", error);
          // Fallback categories
          set({
            categories: [
              "All",
              "mens-shirts",
              "fragrances",
              "skincare",
              "smartphones",
              "laptops",
              "groceries",
            ],
          });
        }
      },

      // Set selected category
      setSelectedCategory: (category: string) => {
        set({ selectedCategory: category });
        get().fetchProductsByCategory(category);
      },

      // Set sorting
      setSorting: (
        sortBy: "name" | "price" | "rating",
        order: "asc" | "desc"
      ) => {
        set({ sortBy, sortOrder: order });
      },

      // Get filtered and sorted products
      getFilteredProducts: () => {
        const { products, sortBy, sortOrder } = get();

        const sorted = [...products].sort((a, b) => {
          let comparison = 0;

          switch (sortBy) {
            case "name":
              comparison = (a.title ?? "").localeCompare(b.title ?? "");
              break;
            case "price":
              comparison = a.price - b.price;
              break;
            case "rating":
              comparison = (a.rating ?? 0) - (b.rating ?? 0);
              break;
          }

          return sortOrder === "asc" ? comparison : -comparison;
        });

        return sorted;
      },

      // Get product by ID

      getProductById: (id: number) => {
        return get().products.find((product) => product.id === id);
      },

      // Cart actions
      addToCart: (product: Product, quantity: number = 1) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);

        let updatedCart;
        if (existingItem) {
          updatedCart = cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          const cartItem: CartItem = {
            id: product.id,
            name: product.name || product.title || "",
            price: product.price,
            discount: product.discount,
            discountedPrice: product.discountedPrice,
            image: product.thumbnail ?? "",
            category: product.category,
            quantity,
          };
          updatedCart = [...cartItems, cartItem];
        }

        const cartTotal = updatedCart.reduce((total, item) => {
          const itemPrice = item.discountedPrice || item.price;
          return total + itemPrice * item.quantity;
        }, 0);

        set({ cartItems: updatedCart, cartTotal });
      },

      removeFromCart: (productId: number) => {
        const { cartItems } = get();
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        const cartTotal = updatedCart.reduce((total, item) => {
          const itemPrice = item.discountedPrice || item.price;
          return total + itemPrice * item.quantity;
        }, 0);

        set({ cartItems: updatedCart, cartTotal });
      },

      updateQuantity: (productId: number, quantity: number) => {
        const { cartItems } = get();
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        const updatedCart = cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );

        const cartTotal = updatedCart.reduce((total, item) => {
          const itemPrice = item.discountedPrice || item.price;
          return total + itemPrice * item.quantity;
        }, 0);

        set({ cartItems: updatedCart, cartTotal });
      },

      clearCart: () => {
        set({ cartItems: [], cartTotal: 0 });
      },
    }),
    {
      name: "product-store", // localStorage key
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartTotal: state.cartTotal,
        selectedCategory: state.selectedCategory,
      }), // Only persist cart and selected category
    }
  )
);

// Custom hooks
export const useProducts = () => {
  const {
    products,
    featuredProducts,
    isLoading,
    error,
    fetchProducts,
    getFilteredProducts,
  } = useProductStore();

  return {
    products,
    featuredProducts,
    isLoading,
    error,
    fetchProducts,
    filteredProducts: getFilteredProducts(),
  };
};

export const useCart = () => {
  const {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useProductStore();

  return {
    cartItems,
    cartTotal,
    itemCount: cartItems.reduce((total, item) => total + item.quantity, 0),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};

export const useCategories = () => {
  const { categories, selectedCategory, setSelectedCategory, fetchCategories } =
    useProductStore();

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    fetchCategories,
  };
};
