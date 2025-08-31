import api from "./api";

// GET preferences
export const getPreferences = (token) =>
    api.get("/preference", {
        headers: { token: `Bearer ${token}` },
    });

// PATCH preference (add/remove)
export const updatePreferences = (token, { add, remove }) =>
    api.patch(
        "/preference/search",
        { ...(add && { add }), ...(remove && { remove }) },
        { headers: { token: `Bearer ${token}` } }
    );