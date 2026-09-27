const UPLOAD = "/image/upload/";

export const productImage = (url: string | undefined | null, width: number) => {
  if (!url) return "";
  if (!url.includes(UPLOAD)) return url;

  return url.replace(UPLOAD, `${UPLOAD}c_pad,ar_1:1,b_auto:border,w_${width},f_auto,q_auto/`);
};

export const productImageFull = (url: string | undefined | null, width: number) => {
  if (!url) return "";
  if (!url.includes(UPLOAD)) return url;

  return url.replace(UPLOAD, `${UPLOAD}c_limit,w_${width},h_${width},f_auto,q_auto/`);
};
