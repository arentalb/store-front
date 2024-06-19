export function FullImageUrl(imageName: string) {
  const baseURL = import.meta.env.VITE_IMAGE_BASE_URL;

  // Check if the imageName is a local preview URL
  if (imageName.startsWith("blob:")) {
    return imageName;
  }

  return `${baseURL}${imageName}`;
}
