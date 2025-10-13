// src/api/contents.ts
import api from "./api";

export const getContents = async () => {
  const res = await api.get("/contents");
  return res.data;
};
