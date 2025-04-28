import apiService from "../services/apiService";

const isClientSide = typeof window !== "undefined";

// AUTH
export const getCurrentUser = async (): Promise<any | null> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.warn("No valid access token available. User may need to log in.");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/current/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch user data:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchWithAuth:", error);
    return null;
  }
};

export const register = async (
  email: string,
  password1: string,
  password2: string
) => {
  if (password1 !== password2) {
    throw new Error("Passwords do not match.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: password1,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Registration failed.");
  }

  const data = await response.json();

  if (isClientSide) {
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
  }

  return data;
};

export const login = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed.");
  }

  const data = await response.json();

  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
  }

  return data;
};

export const logout = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken) throw new Error("No access token available for logout.");
  if (!refreshToken) throw new Error("No refresh token available for logout.");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh: refreshToken }),
    }
  );

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.statusText}`);
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user_id");
  return true;
};

export const isTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.warn("No refresh token found in localStorage.");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (!response.ok) {
      console.error("Failed to refresh token:", response.statusText);
      return null;
    }

    const data = await response.json();
    console.log("New access token received:", data.access);
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
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

    if (accessToken && isTokenExpired(accessToken)) {
      console.warn("Access token expired. Refreshing token...");
      accessToken = await refreshAccessToken();
    }

    if (!accessToken) {
      console.warn("No valid access token available. User may need to log in.");
      throw new Error("No valid access token.");
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
    if (error !== "No valid access token.") {
      console.error("Error in fetchWithAuth:", error);
    }
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

export const createReservation = async (reservationData: any): Promise<any> => {
  try {
    let token = localStorage.getItem("accessToken");

    if (token && isTokenExpired(token)) {
      console.warn("Access token expired. Refreshing...");
      token = await refreshAccessToken();
      if (!token)
        throw new Error("Failed to refresh token. Please log in again.");
    }

    console.log("Creating reservation with token:", token);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/create/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend response error:", errorData);
      throw new Error(errorData.error || "Failed to create reservation.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
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
