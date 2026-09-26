const formatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0,
});

/** 1250000 -> "$ 1.250.000" */
export const formatPrice = (price: number) => `$ ${formatter.format(price)}`;
