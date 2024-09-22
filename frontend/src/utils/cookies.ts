import Cookies from "js-cookie";

export const setCookies= <T>(
  key: string,
  value: T,
  expiresInDays: number = 7
): void => {
  const valueString = JSON.stringify(value);
  Cookies.set(key, valueString, { expires: expiresInDays });
};

export const getCookies = <T>(key: string): T | undefined => {
  const valueString = Cookies.get(key);

  if (valueString) {
    try {
      return JSON.parse(valueString) as T;
    } catch (error) {
      console.error(`Failed to parse cookie value for key "${key}":`, error);
      return undefined;
    }
  }

  return undefined;
};

export const removeCookies = (key: string): void => {
  Cookies.remove(key);
};
