import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: "https://cantsaydorifto-task-tracker.vercel.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
