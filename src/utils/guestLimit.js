const USED_KEY = "snip_guest_used";
const RESULT_KEY = "snip_guest_result";

export const hasUsedGuestShorten = () => {
  return localStorage.getItem(USED_KEY) === "true";
};

export const markGuestShortenUsed = () => {
  localStorage.setItem(USED_KEY, "true");
};

export const saveGuestShortUrl = (data) => {
  localStorage.setItem(RESULT_KEY, JSON.stringify(data));
};

export const getGuestShortUrl = () => {
  const raw = localStorage.getItem(RESULT_KEY);
  return raw ? JSON.parse(raw) : null;
};