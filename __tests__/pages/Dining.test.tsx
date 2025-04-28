import { render, screen } from "@testing-library/react";
import DiningHomePage from "@/app/dining/page";
import "@testing-library/jest-dom";

jest.mock("@/app/components/services/DiningServices", () => () => (
  <div>Mocked Dining Services</div>
));

describe("Dining Page", () => {
  it("renders the Welcome heading", () => {
    render(<DiningHomePage />);
    expect(
      screen.getByRole("heading", { name: /Welcome to The Veiled Board/i })
    ).toBeInTheDocument();
  });

  it("renders the restaurant image", () => {
    render(<DiningHomePage />);
    expect(screen.getByAltText(/The Veiled Board/i)).toBeInTheDocument();
  });

  it("renders the mocked Dining Services component", () => {
    render(<DiningHomePage />);
    expect(screen.getByText(/Mocked Dining Services/i)).toBeInTheDocument();
  });
});
