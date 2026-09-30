import type { CSSProperties } from "react";

export type CategoryColor = {
  strong: string;
  soft: string;
};

const palette: CategoryColor[] = [
  { strong: "#2f6fe0", soft: "#e8f0ff" },
  { strong: "#7b4bd6", soft: "#f1ebfc" },
  { strong: "#0f9d58", soft: "#e4f6eb" },
  { strong: "#d98f00", soft: "#fff5d9" },
  { strong: "#e5322a", soft: "#fde8e6" },
  { strong: "#0f9ba0", soft: "#e2f5f5" },
  { strong: "#d6408f", soft: "#fce8f3" },
  { strong: "#5b6b7a", soft: "#eef1f4" },
];

const known: Record<string, number> = {
  ropa: 0,
  tecnologia: 1,
  deportes: 2,
  cocina: 3,
  gamer: 4,
  comida: 5,
  hogar: 7,
  belleza: 6,
};

const normalize = (name: string) =>
  name.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();

export const categoryColor = (name: string): CategoryColor => {
  const key = normalize(name);
  if (key in known) return palette[known[key]];

  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;

  return palette[hash % palette.length];
};

export const categoryStyle = (name: string | undefined): CSSProperties | undefined => {
  if (!name) return undefined;
  const { strong, soft } = categoryColor(name);

  return { "--cat": strong, "--cat-soft": soft } as CSSProperties;
};
