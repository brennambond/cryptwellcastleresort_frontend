import apiService from "../services/apiService";

const isClientSide = typeof window !== "undefined";

// AUTH
export const getCurrentUser = async () => {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/current/`
  );
};

export const login = async (email: string, password: string) => {
  return await apiService.post("/api/auth/login/", { email, password });
};

export const logout = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("No access token available for logout.");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.statusText}`);
  }

  // Clear tokens
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user_id"); // If used
  return true;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("Refresh token is missing.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to refresh access token: ${response.statusText}`);
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.access);
  return data.access;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true; // Treat invalid tokens as expired
  }
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  try {
    if (!isClientSide) {
      throw new Error("fetchWithAuth should only run on the client side.");
    }

    let accessToken = localStorage.getItem("accessToken");

    // Check if the token is expired
    if (accessToken && isTokenExpired(accessToken)) {
      console.warn("Access token expired. Refreshing token...");
      accessToken = await refreshAccessToken();
    }

    if (!accessToken) {
      throw new Error("No valid access token. Please log in again.");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText} (URL: ${url})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchWithAuth:", error);
    throw error;
  }
};

// RESERVATIONS
export const getReservations = async () => {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/`
  );
};

export const getReservation = async (reservationId: string) => {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservationId}/`
  );
};

export const createReservation = async (data: any) => {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/create/`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};

export const updateReservation = async (reservationId: string, data: any) => {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservationId}/update/`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
};

export const deleteReservation = async (reservationId: string) => {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservationId}/delete/`,
    {
      method: "DELETE",
    }
  );
};

// ROOMS
export const getRooms = async () => {
  return await apiService.get("/api/rooms/rooms/");
};

export const getRoom = async (roomId: string) => {
  return await apiService.get(`/api/rooms/rooms/${roomId}/`);
};

export const getWings = async () => {
  return await apiService.get("/api/rooms/wings/");
};

export const getWing = async (wingId: string) => {
  return await apiService.get(`/api/rooms/wings/${wingId}/`);
};
