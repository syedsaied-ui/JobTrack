import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let guestTokenPromise;

async function getGuestToken() {
  const savedToken = localStorage.getItem("jobtrack_guest_token");

  if (savedToken) {
    return savedToken;
  }

  // Reuse an in-progress request if multiple API calls happen together.
  if (!guestTokenPromise) {
    guestTokenPromise = axios
      .post(`${baseURL.replace(/\/+$/, "")}/guest-session`)
      .then((response) => {
        const token = response.data.token;

        if (!token) {
          throw new Error("Guest session token was not returned");
        }

        localStorage.setItem("jobtrack_guest_token", token);
        return token;
      })
      .finally(() => {
        guestTokenPromise = undefined;
      });
  }

  return guestTokenPromise;
}

api.interceptors.request.use(async (config) => {
  const token = await getGuestToken();

  config.headers.set("Authorization", `Bearer ${token}`);

  return config;
});

export default api;
