import apiService from "@/app/services/apiService";
import { mocked } from "jest-mock";

export function mockApiServiceGet(url: string, response: any) {
  mocked(apiService.get).mockImplementationOnce(async (incomingUrl: string) => {
    if (incomingUrl.includes(url)) {
      return response;
    }
    throw new Error(`Unhandled API request: ${incomingUrl}`);
  });
}
