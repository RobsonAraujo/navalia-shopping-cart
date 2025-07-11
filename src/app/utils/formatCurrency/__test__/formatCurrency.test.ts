import { formatCurrency } from "../formatCurrency";

describe("formatCurrency", () => {
  it("formats a whole number correctly", () => {
    expect(formatCurrency(100)).toBe("$100.00");
  });

  it("formats a decimal number correctly", () => {
    expect(formatCurrency(49.99)).toBe("$49.99");
  });

  it("formats a small decimal number correctly", () => {
    expect(formatCurrency(0.5)).toBe("$0.50");
  });

  it("formats a large number correctly", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000.00");
  });

  it("formats zero correctly", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("handles negative values correctly", () => {
    expect(formatCurrency(-25.5)).toBe("-$25.50");
  });
});
