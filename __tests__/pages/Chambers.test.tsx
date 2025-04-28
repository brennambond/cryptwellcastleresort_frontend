import { render, screen } from "@testing-library/react";
import ChambersHomePage from "@/app/chambers/page";

jest.mock("@/app/components/chambers/ChambersList", () => () => (
  <div>Mocked ChambersList</div>
));
jest.mock("@/app/components/services/ChamberServices", () => () => (
  <div>Mocked ChamberServices</div>
));
jest.mock("@/app/components/header/SearchFilters", () => () => (
  <div>Mocked SearchFilters</div>
));
jest.mock("@/app/components/header/SearchModal", () => () => (
  <div>Mocked SearchModal</div>
));

describe("Chambers Page", () => {
  it("renders the Guest Chambers heading", () => {
    render(<ChambersHomePage />);
    expect(
      screen.getByRole("heading", { name: /Guest Chambers/i })
    ).toBeInTheDocument();
  });

  it("renders the room description paragraph", () => {
    render(<ChambersHomePage />);
    expect(
      screen.getByText(/Each Wing of our resort comprises 30 guest chambers/i)
    ).toBeInTheDocument();
  });

  it("renders the Search Filters component", () => {
    render(<ChambersHomePage />);
    expect(screen.getByText(/Mocked SearchFilters/i)).toBeInTheDocument();
  });

  it("renders the Search Modal component", () => {
    render(<ChambersHomePage />);
    expect(screen.getByText(/Mocked SearchModal/i)).toBeInTheDocument();
  });

  it("renders the Chambers List component", () => {
    render(<ChambersHomePage />);
    expect(screen.getByText(/Mocked ChambersList/i)).toBeInTheDocument();
  });

  it("renders the Chamber Services component", () => {
    render(<ChambersHomePage />);
    expect(screen.getByText(/Mocked ChamberServices/i)).toBeInTheDocument();
  });
});
