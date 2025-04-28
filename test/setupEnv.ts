import "@testing-library/jest-dom";
import { createMockRouter } from "./utils/createMockRouter";

jest.mock("next/navigation", () => {
  return {
    useRouter: () => createMockRouter(),
  };
});

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;
