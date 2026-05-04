export const isDevMode = import.meta.env.DEV;
export const isTestMode = import.meta.env.MODE === "test";
export const isProdNonTestMode = !import.meta.env.DEV && import.meta.env.MODE !== "test";
