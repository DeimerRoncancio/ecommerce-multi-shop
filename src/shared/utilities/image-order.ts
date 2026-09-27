type NamedImage = { name: string };

export const imagePosition = (name: string) => {
  const match = /-(\d+)(\.[^.]+)?$/.exec(name ?? "");
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

export const sortImages = <T extends NamedImage>(images: T[]): T[] =>
  [...images].sort((a, b) => imagePosition(a.name) - imagePosition(b.name));
