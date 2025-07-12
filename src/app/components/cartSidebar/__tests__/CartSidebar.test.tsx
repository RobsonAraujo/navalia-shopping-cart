import { render, screen, fireEvent } from "@testing-library/react";
import CartSidebar from "../CartSidebar";
import { CartItem, Product } from "@/app/types/cart";

const mockProducts: Product[] = [
  { id: "1", name: "Product 1", price: 100, image: "", rating: "5" },
  { id: "2", name: "Product 2", price: 50, image: "", rating: "4" },
];

const mockRemoveFromCart = jest.fn();

describe("CartSidebar", () => {
  it("displays 'Your cart is empty' when the cart is empty", () => {
    render(
      <CartSidebar
        cart={[]}
        products={mockProducts}
        removeFromCart={mockRemoveFromCart}
      />
    );

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("renders cart items correctly", () => {
    const cartItems: CartItem[] = [
      { productId: "1", quantity: 2 },
      { productId: "2", quantity: 1 },
    ];

    render(
      <CartSidebar
        cart={cartItems}
        products={mockProducts}
        removeFromCart={mockRemoveFromCart}
      />
    );

    expect(screen.getByText("Product 1 x 2")).toBeInTheDocument();
    expect(screen.getByText("Product 2 x 1")).toBeInTheDocument();
    expect(screen.getByText("$200.00")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  it("calls removeFromCart when the remove button is clicked", () => {
    const cartItems: CartItem[] = [{ productId: "1", quantity: 2 }];

    render(
      <CartSidebar
        cart={cartItems}
        products={mockProducts}
        removeFromCart={mockRemoveFromCart}
      />
    );

    const removeButton = screen.getByLabelText("Remove Product 1 from cart");
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith("1");
  });

  it("displays the correct total", () => {
    const cartItems: CartItem[] = [
      { productId: "1", quantity: 2 },
      { productId: "2", quantity: 1 },
    ];

    render(
      <CartSidebar
        cart={cartItems}
        products={mockProducts}
        removeFromCart={mockRemoveFromCart}
      />
    );

    expect(screen.getByText("$250.00")).toBeInTheDocument(); // $200 + $50 = $250
  });
});
