import api from "./api";

export const shortenUrl = async (originalUrl, expiresInDays) => {
    const response = await api.post("/api/urls/shorten", {
        originalUrl,
        // Only sent when the caller picks an expiry option.
        // NOTE: backend must accept this field for expiry to actually be enforced -
        // if it's ignored server-side, the link simply never expires.
        ...(expiresInDays ? { expiresInDays } : {}),
    });

    return response.data;
};

export const getMyUrls = async () => {
    const response = await api.get("/api/urls/my");
    return response.data;
};

export const deleteUrl = async (id) => {
    return await api.delete(`/api/urls/${id}`);
};