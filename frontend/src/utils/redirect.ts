const REDIRECT_KEY = "auth:redirectTo";

const isSafeRedirect = (path: string | null): path is string =>
  !!path &&
  path.startsWith("/") &&
  !path.startsWith("//") &&
  !path.startsWith("/\\") &&
  !["/signin", "/signup"].includes(path);

export const setRedirectTo = (path: string) => {
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const consumeRedirectTo = (): string => {
  let raw: string | null = null;

  raw = sessionStorage.getItem(REDIRECT_KEY);
  sessionStorage.removeItem(REDIRECT_KEY);

  return isSafeRedirect(raw) ? raw : "/";
};
