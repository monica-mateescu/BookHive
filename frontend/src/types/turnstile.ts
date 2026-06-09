export type TurnstileSize = "normal" | "compact";
export type TurnstileTheme = "light" | "dark" | "auto";

export interface TurnstileOptions {
  sitekey: string;
  size?: TurnstileSize;
  theme?: TurnstileTheme;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  callback?: (token: string) => void;
}

export interface TurnstileInstance {
  render: (
    container: string | HTMLElement,
    options: TurnstileOptions,
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  getResponse: (widgetId: string) => string;
}
