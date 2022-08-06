import axios from "axios";
import { environment } from "./environment";

export const api = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    "Content-Type": "application/json",
  },
})
