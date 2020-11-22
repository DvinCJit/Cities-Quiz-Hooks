import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const startgame = (data) => apiClient.post("/", data);
export const placeCity = (data) => apiClient.post("/cities-quiz", data);
export const getHighScore = () => apiClient.get("/cities-quiz");

const api = {
  startgame,
  placeCity,
  getHighScore,
};

export default api;
