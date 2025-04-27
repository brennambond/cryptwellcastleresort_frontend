// __tests__/pages/Home.test.tsx

import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock TypingText since HotelIntro depends on it
jest.mock("@/app/components/CustomTexts", () => ({
  TypingText: ({ title }: { title: string }) => <div>{title}</div>,
}));

// Mock WingsSection API usage
jest.mock("@/app/components/wings/WingsSection", () => () => (
  <div>Mocked Wings Section</div>
));

// Mock MotionDiv
jest.mock("@/components/motion/MotionDiv", () => ({ children }: any) => (
  <div>{children}</div>
));

describe("Home Page", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("renders Hero Section text", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        name: /Welcome to The Cyptwell Castle Resort/i,
      })
    ).toBeInTheDocument();
  });

  it("renders Hotel Intro text", () => {
    render(<Home />);
    expect(
      screen.getByText(/The vacation of your nightmares starts here/i)
    ).toBeInTheDocument();
  });

  it("renders Dining Section text", () => {
    render(<Home />);
    expect(screen.getByText(/Dining/i)).toBeInTheDocument();
    expect(screen.getByText(/The Veiled Board/i)).toBeInTheDocument();
  });

  it("renders Contact Section text", () => {
    render(<Home />);
    expect(screen.getByText(/Your Nightmare Awaits/i)).toBeInTheDocument();
    expect(screen.getByText(/Hotel Services Available/i)).toBeInTheDocument();
  });

  it("renders Mocked Wings Section", () => {
    render(<Home />);
    expect(screen.getByText(/Mocked Wings Section/i)).toBeInTheDocument();
  });
});
