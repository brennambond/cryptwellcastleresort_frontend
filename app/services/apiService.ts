import {
  fetchWithAuth,
  isTokenExpired,
  refreshAccessToken,
} from "../lib/actions";

const apiService = {
  get: async (url: string) => {
    const finalUrl = url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_API_URL}${url}`;

    const response = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `GET request failed for ${finalUrl}: ${response.statusText}`
      );
    }

    return await response.json();
  },

  post: async (url: string, body: any) => {
    return await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put: async (url: string, body: any) => {
    return await fetchWithAuth(url, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete: async (url: string) => {
    return await fetchWithAuth(url, {
      method: "DELETE",
    });
  },

  getRooms: async (query: string = "") => {
    const relativeUrl = `/rooms/rooms/${query}`;
    return await apiService.get(relativeUrl);
  },

  getRoomDetails: async (roomId: string) => {
    const url = `/rooms/rooms/${roomId}/`;
    return await apiService.get(url);
  },

  getReservations: async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservations/`;
    return await fetchWithAuth(url);
  },

  getUserReservations: async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservations/`;
    return await apiService.get(url);
  },

  getReservationsByRoom: async (roomId: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rooms/rooms/${roomId}/reservations/`;
    return await apiService.get(url);
  },

  createReservation: async (body: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservations/create/`;
    return await apiService.post(url, body);
  },

  updateReservation: async (reservationId: string, body: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservationId}/update/`;
    return await apiService.put(url, body);
  },

  deleteReservation: async (reservationId: string): Promise<void> => {
    let token = localStorage.getItem("accessToken");

    if (token && isTokenExpired(token)) {
      console.log("Token expired. Refreshing...");
      token = await refreshAccessToken();
      if (!token)
        throw new Error("Failed to refresh token. Please log in again.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservationId}/delete/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to delete reservation.");
    }

    console.log("Reservation deleted successfully.");
  },
};

export default apiService;
