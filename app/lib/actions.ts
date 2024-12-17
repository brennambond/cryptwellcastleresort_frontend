"use server";

// Ensure this runs only on the client side
const isClientSide = typeof window !== "undefined";

export const getUserId = async (): Promise<string | null> => {
  try {
    if (!isClientSide) {
      console.error("getUserId should only be called on the client side.");
      return null;
    }

    // Retrieve access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.warn("Access token is missing. Please log in again.");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/auth/user/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user ID: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.id || null;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/auth/login/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();

    if (isClientSide) {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    if (!isClientSide) {
      throw new Error("refreshAccessToken should only run on the client side.");
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.warn("Refresh token is missing.");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/auth/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (!response.ok) {
      console.error("Failed to refresh access token:", response.statusText);
      return null;
    }

    const data = await response.json();

    if (data.access && isClientSide) {
      localStorage.setItem("accessToken", data.access);
    }

    return data.access || null;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
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
      throw new Error(`Request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchWithAuth:", error);
    throw error;
  }
};

export const logout = (): void => {
  try {
    if (isClientSide) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
