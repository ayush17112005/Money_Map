export const getStoredJson = (key, fallbackValue) => {
  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return fallbackValue;
    }

    return JSON.parse(rawValue);
  } catch {
    return fallbackValue;
  }
};

export const getStoredString = (key, fallbackValue) => {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ?? fallbackValue;
  } catch {
    return fallbackValue;
  }
};
