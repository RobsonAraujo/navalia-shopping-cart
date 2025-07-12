import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "@/app/contexts/useCart";
import { CartItem } from "@/app/types/cart";

const MockComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <div>
      <button onClick={() => addToCart("1")}>Add Item 1</button>
      <button onClick={() => addToCart("2", 2)}>Add Item 2 (quantity 2)</button>
      <button onClick={() => removeFromCart("1")}>Remove Item 1</button>
      <button onClick={() => updateQuantity("2", 3)}>
        Update Item 2 quantity to 3
      </button>

      <div data-testid="cart">
        {cart.map((item: CartItem) => (
          <div key={item.productId}>
            {item.productId} - {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should load cart from localStorage if available", () => {
    const initialCart = [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 2 },
    ];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>
    );

    expect(screen.getByText("1 - 1")).toBeInTheDocument();
    expect(screen.getByText("2 - 2")).toBeInTheDocument();
  });

  it("should add items to the cart", () => {
    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Add Item 1"));
    fireEvent.click(screen.getByText("Add Item 2 (quantity 2)"));

    expect(screen.getByText("1 - 1")).toBeInTheDocument();
    expect(screen.getByText("2 - 2")).toBeInTheDocument();
  });

  it("should remove an item from the cart", () => {
    const initialCart = [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 2 },
    ];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Remove Item 1"));

    expect(screen.queryByText("1 - 1")).not.toBeInTheDocument();
    expect(screen.getByText("2 - 2")).toBeInTheDocument();
  });

  it("should update the quantity of an item", () => {
    const initialCart = [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 2 },
    ];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Update Item 2 quantity to 3"));

    expect(screen.getByText("2 - 3")).toBeInTheDocument();
  });

  it("should save cart to localStorage after updates", () => {
    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Add Item 1"));
    fireEvent.click(screen.getByText("Add Item 2 (quantity 2)"));

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(savedCart).toHaveLength(2);
    expect(savedCart[0].productId).toBe("1");
    expect(savedCart[1].productId).toBe("2");
  });
});
