type MaterialIconFamily = "material-icons" | "material-symbols-outlined";

const SOURCE_FILES = import.meta.glob("../**/*.{astro,css,js,jsx,ts,tsx}", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const ICON_NAME_PATTERN = /^[a-z0-9_]+$/;

const extractTagIconNames = (source: string, familyClass: MaterialIconFamily): string[] => {
  const pattern = new RegExp(`<[^>]*class(?:Name)?\\s*=\\s*["'\`][^"'\`]*\\b${familyClass}\\b[^"'\`]*["'\`][^>]*>\\s*([a-z0-9_]+)\\s*<\\/[^>]+>`, "gim");
  const names: string[] = [];
  let match: RegExpExecArray | null = pattern.exec(source);
  while (match) {
    names.push(match[1]);
    match = pattern.exec(source);
  }
  return names;
};

const extractDomIconNames = (source: string, familyClass: MaterialIconFamily): string[] => {
  const pattern = new RegExp(`className\\s*=\\s*["'\`][^"'\`]*\\b${familyClass}\\b[^"'\`]*["'\`][\\s\\S]{0,240}?textContent\\s*=\\s*["'\`]([a-z0-9_]+)["'\`]`, "gim");
  const names: string[] = [];
  let match: RegExpExecArray | null = pattern.exec(source);
  while (match) {
    names.push(match[1]);
    match = pattern.exec(source);
  }
  return names;
};

const extractCssContentIconNames = (source: string, fontFamily: "Material Icons" | "Material Symbols Outlined"): string[] => {
  const forwardPattern = new RegExp(`font-family\\s*:\\s*["']${fontFamily}["'];[\\s\\S]{0,240}?content\\s*:\\s*["']([a-z0-9_]+)["']`, "gim");
  const backwardPattern = new RegExp(`content\\s*:\\s*["']([a-z0-9_]+)["'];[\\s\\S]{0,240}?font-family\\s*:\\s*["']${fontFamily}["']`, "gim");
  const names: string[] = [];

  let match: RegExpExecArray | null = forwardPattern.exec(source);
  while (match) {
    names.push(match[1]);
    match = forwardPattern.exec(source);
  }

  match = backwardPattern.exec(source);
  while (match) {
    names.push(match[1]);
    match = backwardPattern.exec(source);
  }

  return names;
};

const collectMaterialIconNames = (): Record<MaterialIconFamily, Set<string>> => {
  const result: Record<MaterialIconFamily, Set<string>> = {
    "material-icons": new Set<string>(),
    "material-symbols-outlined": new Set<string>(),
  };

  const addIconName = (family: MaterialIconFamily, name: string): void => {
    const normalizedName = name.trim();
    if (!ICON_NAME_PATTERN.test(normalizedName)) return;
    result[family].add(normalizedName);
  };

  Object.values(SOURCE_FILES).forEach((source) => {
    extractTagIconNames(source, "material-icons").forEach((name) => addIconName("material-icons", name));
    extractTagIconNames(source, "material-symbols-outlined").forEach((name) => addIconName("material-symbols-outlined", name));
    extractDomIconNames(source, "material-icons").forEach((name) => addIconName("material-icons", name));
    extractDomIconNames(source, "material-symbols-outlined").forEach((name) => addIconName("material-symbols-outlined", name));
    extractCssContentIconNames(source, "Material Icons").forEach((name) => addIconName("material-icons", name));
    extractCssContentIconNames(source, "Material Symbols Outlined").forEach((name) => addIconName("material-symbols-outlined", name));
  });

  return result;
};

const buildGoogleFontsStylesheetUrl = (family: MaterialIconFamily, iconNames: string[]): string => {
  if (iconNames.length === 0) return "";

  const sortedIconNames = [...new Set(iconNames)].sort((a, b) => a.localeCompare(b, "en"));
  const iconNamesQuery = sortedIconNames.join(",");

  if (family === "material-icons") {
    return `https://fonts.googleapis.com/css2?family=Material+Icons&icon_names=${iconNamesQuery}&display=swap`;
  }

  return `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${iconNamesQuery}&display=swap`;
};

const createMaterialIconStylesheets = (): string[] => {
  const iconNamesByFamily = collectMaterialIconNames();

  return [
    buildGoogleFontsStylesheetUrl("material-icons", [...iconNamesByFamily["material-icons"]]),
    buildGoogleFontsStylesheetUrl("material-symbols-outlined", [...iconNamesByFamily["material-symbols-outlined"]]),
  ].filter((href): href is string => href.length > 0);
};

export const materialIconStylesheets = createMaterialIconStylesheets();
