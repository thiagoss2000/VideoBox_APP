import api from "./api";

export const getTimeline = (token, newList = false) =>
api.get(`/timeline${newList ? "?newList=true" : ""}`, {
    headers: { token: `Bearer ${token}` },
});
