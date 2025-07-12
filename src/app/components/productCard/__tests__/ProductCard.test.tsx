import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/app/components/productCard/ProductCard";
import { Product } from "@/app/types/cart";

const mockOnAddToCart = jest.fn();

const product: Product = {
  id: "1",
  name: "Test Product",
  price: 100,
  image: "http://image.jpeg",
  location: "New York",
  rating: "4",
};

test("renders product details and button", () => {
  render(<ProductCard {...product} onAddToCart={mockOnAddToCart} />);

  expect(screen.getByText("Test Product")).toBeInTheDocument();

  expect(screen.getByText("$100")).toBeInTheDocument();

  expect(screen.getByText("New York")).toBeInTheDocument();

  expect(screen.getByText("4")).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /add to cart/i });
  expect(button).toBeInTheDocument();
});

test('calls onAddToCart when "Add to Cart" button is clicked', () => {
  render(<ProductCard {...product} onAddToCart={mockOnAddToCart} />);

  const button = screen.getByRole("button", { name: /add to cart/i });
  fireEvent.click(button);

  expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
});
