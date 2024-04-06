import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "https://localhost:7219/",
  timeout: 5000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("🚀 ~ error:", error);
    if (error.response) {
      const { data, status } = error.response;
      toast.error(`Error: ${status} - ${data}`);
    } else if (error.request) {
      toast.error("No response received from the server.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error); // Return a rejected promise
  }
);

export default instance;
