import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { "Content-Type": "application/json"}
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // token expired / invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
)
export default axiosInstance;