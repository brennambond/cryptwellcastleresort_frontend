import { fetchWithAuth } from "../lib/actions";

const apiService = {
  // Generic GET request
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

  // Generic POST request
  post: async (url: string, body: any) => {
    return await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  // Generic PUT request
  put: async (url: string, body: any) => {
    return await fetchWithAuth(url, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  // Generic DELETE request
  delete: async (url: string) => {
    return await fetchWithAuth(url, {
      method: "DELETE",
    });
  },

  // Fetch all rooms
  getRooms: async (query: string = "") => {
    const relativeUrl = `/rooms/rooms/${query}`;
    return await apiService.get(relativeUrl);
  },

  // Fetch details for a specific room
  getRoomDetails: async (roomId: string) => {
    const url = `/rooms/rooms/${roomId}/`;
    return await apiService.get(url);
  },

  // Fetch all reservations
  getReservations: async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservations/`;
    return await fetchWithAuth(url);
  },

  // Create a new reservation
  createReservation: async (body: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservations/create/`;
    return await apiService.post(url, body);
  },

  // Update an existing reservation
  updateReservation: async (reservationId: string, body: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservationId}/update/`;
    return await apiService.put(url, body);
  },

  // Delete a reservation
  deleteReservation: async (reservationId: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservationId}/delete/`;
    return await apiService.delete(url);
  },
};

export default apiService;
