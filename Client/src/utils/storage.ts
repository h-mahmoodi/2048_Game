export const saveToLocalStorage = (key: string, value: any) => {
  try {
    const strigify = JSON.stringify(value);
    localStorage.setItem(key, strigify);
  } catch (error) {
    console.error('Failed to save to local storage:', error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Failed to load from local storage:', error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from local storage:', error);
  }
};
