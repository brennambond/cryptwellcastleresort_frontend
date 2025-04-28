jest.mock("@/app/services/apiService", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

jest.mock(
  "@/app/components/reservations/reservationsidebar/ReservationSidebar",
  () => ({
    __esModule: true,
    default: () => <div>Mocked Reservation Sidebar</div>,
  })
);

jest.mock("@/app/components/services/ChamberServices", () => ({
  __esModule: true,
  default: () => <div>Mocked Chamber Services</div>,
}));

import { render, screen, waitFor } from "@/test/utils/customRender";
import ChamberDetailPage from "@/app/chambers/[id]/page";
import { mockApiServiceGet } from "@/test/utils/mockApiServiceGet";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { mocked } from "jest-mock";

jest.mock("next/navigation", () => {
  const actualNavigation = jest.requireActual("next/navigation");
  return {
    ...actualNavigation,
    useRouter: jest.fn(),
  };
});

describe("ChamberDetailPage", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as any);
    pushMock.mockClear();
  });

  it("renders chamber title and mocked components", async () => {
    mockApiServiceGet("/rooms/rooms/1", {
      id: "1",
      title: "Phantom Suite",
      description: "The most haunted suite in the castle.",
      price: 200,
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      image_url: "/phantom-suite.jpg",
    });

    render(<ChamberDetailPage params={{ id: "1" }} />);

    expect(
      await screen.findByRole("heading", { name: /Phantom Suite/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Phantom Suite/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Reservation Sidebar/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Chamber Services/i)).toBeInTheDocument();
  });

  it("redirects to 404 if API call fails", async () => {
    mocked(apiService.get).mockRejectedValueOnce(new Error("API error"));

    render(<ChamberDetailPage params={{ id: "invalid-id" }} />);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/404");
    });
  });
});
