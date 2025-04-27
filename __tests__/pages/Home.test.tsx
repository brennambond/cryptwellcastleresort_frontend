import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/app/components/wings/WingsSection", () => () => (
  <div>Mocked Wings Section</div>
));

jest.mock("@/app/components/DiningSection", () => () => (
  <section>
    <h2>Dining</h2>
  </section>
));

jest.mock("@/app/components/ContactSection", () => () => (
  <section>
    <h2>Your Nightmare Awaits</h2>
  </section>
));

describe("Home Page", () => {
  it("renders Hero Section text", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        name: /Welcome to The Cyptwell Castle Resort/i,
      })
    ).toBeInTheDocument();
  });

  it("renders Wings Section", () => {
    render(<Home />);
    expect(screen.getByText(/Mocked Wings Section/i)).toBeInTheDocument();
  });

  it("renders Dining Section heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Dining/i })
    ).toBeInTheDocument();
  });

  it("renders Contact Section heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Your Nightmare Awaits/i })
    ).toBeInTheDocument();
  });

  it("renders Explore Our Chambers button", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /Explore Our Chambers/i })
    ).toBeInTheDocument();
  });
});
