const apiService = {
  // Generic GET request
  get: async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`);
    }
    return await response.json();
  },

  // Generic POST request
  post: async (
    url: string,
    body: any,
    headers: Record<string, string> = {}
  ) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`POST request failed: ${response.statusText}`);
    }

    return await response.json();
  },

  // Generic PUT request
  put: async (url: string, body: any, headers: Record<string, string> = {}) => {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`PUT request failed: ${response.statusText}`);
    }

    return await response.json();
  },

  // Generic DELETE request
  delete: async (url: string) => {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`DELETE request failed: ${response.statusText}`);
    }

    return { message: "Successfully deleted" };
  },

  // Fetch all chambers
  getChambers: async (query: string = "") => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/rooms/rooms/${query}`;
      return await apiService.get(url);
    } catch (error) {
      console.error("Error fetching chambers:", error);
      throw error;
    }
  },

  // Fetch details for a specific chamber
  getChamberDetails: async (chamberId: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/rooms/rooms/${chamberId}/`;
      return await apiService.get(url);
    } catch (error) {
      console.error("Error fetching chamber details:", error);
      throw error;
    }
  },

  // Fetch reservations for the logged-in user
  getUserReservations: async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reservations/`;
      return await apiService.get(url);
    } catch (error) {
      console.error("Error fetching user reservations:", error);
      throw error;
    }
  },

  // Fetch reservations for a specific chamber
  getChamberReservations: async (chamberId: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/rooms/rooms/${chamberId}/reservations/`;
      return await apiService.get(url);
    } catch (error) {
      console.error("Error fetching chamber reservations:", error);
      throw error;
    }
  },

  // Book a room
  bookChamber: async (chamberId: string, body: any) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/rooms/rooms/${chamberId}/book/`;
      return await apiService.post(url, body);
    } catch (error) {
      console.error("Error booking chamber:", error);
      throw error;
    }
  },

  // Update a reservation
  updateReservation: async (reservationId: string, body: any) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reservations/${reservationId}/update/`;
      return await apiService.put(url, body);
    } catch (error) {
      console.error("Error updating reservation:", error);
      throw error;
    }
  },

  // Delete a reservation
  deleteReservation: async (reservationId: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reservations/${reservationId}/delete/`;
      return await apiService.delete(url);
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  },
};

export default apiService;
