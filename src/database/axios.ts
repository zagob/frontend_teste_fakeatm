import axios from "axios";
import { parseCookies } from "nookies";

let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["fakeatm.token"]}`,
  },
});
