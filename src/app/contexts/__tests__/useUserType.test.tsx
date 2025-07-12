import { render, screen, fireEvent } from "@testing-library/react";
import { UserTypeProvider, useUserType } from "@/app/contexts/useUserType";

const MockComponent = () => {
  const { userType, setUserType } = useUserType();

  return (
    <div>
      <button onClick={() => setUserType("common")}>Set Common</button>
      <button onClick={() => setUserType("vip")}>Set VIP</button>
      <div data-testid="user-type">{userType}</div>
    </div>
  );
};

describe("UserTypeContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should load userType from localStorage if available", () => {
    localStorage.setItem("userType", "vip");

    render(
      <UserTypeProvider>
        <MockComponent />
      </UserTypeProvider>
    );

    expect(screen.getByTestId("user-type")).toHaveTextContent("vip");
  });

  it("should set and update userType", () => {
    render(
      <UserTypeProvider>
        <MockComponent />
      </UserTypeProvider>
    );

    expect(screen.getByTestId("user-type")).toHaveTextContent("common");

    fireEvent.click(screen.getByText("Set VIP"));
    expect(screen.getByTestId("user-type")).toHaveTextContent("vip");

    fireEvent.click(screen.getByText("Set Common"));
    expect(screen.getByTestId("user-type")).toHaveTextContent("common");
  });

  it("should save userType to localStorage after update", () => {
    render(
      <UserTypeProvider>
        <MockComponent />
      </UserTypeProvider>
    );

    fireEvent.click(screen.getByText("Set VIP"));
    expect(localStorage.getItem("userType")).toBe("vip");

    fireEvent.click(screen.getByText("Set Common"));
    expect(localStorage.getItem("userType")).toBe("common");
  });
});
