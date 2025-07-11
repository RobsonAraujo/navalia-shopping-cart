export type UserType = "common" | "vip";

export type Product = {
  id: string;
  name: string;
  price: number;
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
