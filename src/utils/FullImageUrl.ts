export function FullImageUrl(imageName: string) {
  const baseURL = import.meta.env.VITE_IMAGE_BASE_URL;
  return `${baseURL}${imageName}`;
}
