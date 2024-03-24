import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7219/", // Your base URL
  timeout: 5000, // Optional: Timeout in milliseconds
  // You can add more Axios configuration options here if needed
});

export default instance;
