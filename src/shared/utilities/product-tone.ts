const tones = [
  "bg-peach",
  "bg-sky",
  "bg-butter",
  "bg-mint",
  "bg-lilac",
  "bg-rose",
  "bg-stone",
  "bg-aqua",
] as const;

export const productTone = (id: string) => {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;

  return tones[hash % tones.length];
};

export const toneAt = (index: number) => tones[index % tones.length];
