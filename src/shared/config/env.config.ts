export const envs = {
  API:
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_PRODUCCION
      : import.meta.env.VITE_API_DESARROLLO,
};
