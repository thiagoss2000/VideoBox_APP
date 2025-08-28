import api from "./api";

export const signIn = (email, password) =>
  api.post("/sign-in", { email, password });