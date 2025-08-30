import api from "./api";

export const getTimeline = (token, newList = false) =>
    api.get(`/timeline${newList ? "?newList=true" : ""}`, {
        headers: { token: `Bearer ${token}` },
    });

export const getSearch = (token, searchText) => 
    api.get(`/timeline/search`, {
        params: { search: searchText },
        headers: { token: `Bearer ${token}` },
    });