import { render, screen } from "@testing-library/react";
import WingsHomePage from "@/app/wings/page";
import "@testing-library/jest-dom";

jest.mock("@/app/components/wings/WingsPageSection", () => () => (
  <div>Mocked Wings Page Section</div>
));

describe("Wings Page", () => {
  it("renders WingsPageSection", () => {
    render(<WingsHomePage />);
    expect(screen.getByText(/Mocked Wings Page Section/i)).toBeInTheDocument();
  });
});
