import { PAGINATION_URL, STATE } from "constants/localStorage";

export const setItem = (key: String, value: String): void => {
  localStorage.setItem(key, value);
};

export const getItem = (key: String): String => {
  return localStorage.getItem(key);
};

export const setObject = (key: string, value: Object): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getObject = (key: String): Object => {
  return JSON.parse(localStorage.getItem(key));
};

export const persistState = (state: Object) => {
  try {
    setObject(STATE, state);
  } catch (err) {
    console.error(err);
  }
};

export const loadPersistState = () => {
  try {
    let persistState = getObject(STATE);
    return persistState ? persistState : undefined;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const pageIdChanger = (newPageId: String): String => {
  const newUrl = getItem(PAGINATION_URL).replace(
    /page=\d+/,
    `page=${newPageId}`
  );
  setItem(PAGINATION_URL, newUrl);
  return newUrl;
};
