import { getAccessToken } from "../lib/actions";

const apiService = {
  get: async function (url: string): Promise<any> {
    let token: string | undefined = "";

    {
      url === "/api/auth/myreservations/"
        ? (token = await getAccessToken())
        : (token = "123");
    }

    console.log(token);

    return new Promise((resolve, reject) => {
      fetch(`https://hauntedhotel-backend-api.com${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);

    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`https://hauntedhotel-backend-api.com${url}`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);

    return new Promise((resolve, reject) => {
      fetch(`https://hauntedhotel-backend-api.com${url}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default apiService;
