export type UserType = "common" | "vip";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  location?: string;
  rating?: string | null;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartItemDetailed = {
  productId: string;
  quantity: number;
  unitPrice: number;
  name: string;
};

export type CartTotalResponse = {
  total: number;
  promotion: string;
  recommendation: string;
  details: {
    totalGross: number;
    totalPromo: number;
    totalVIP: number;
    items: CartItemDetailed[];
  };
};
