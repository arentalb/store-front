import { useState } from "react";

export function useImagePreview() {
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const previewUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagesPreview((prev) => [...prev, ...previewUrls]);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setImagesPreview((prev) => prev.filter((url) => url !== imageUrl));
    setDeletedImages((prev) => [...prev, imageUrl]);
  };

  const handleRemoveCoverImage = () => {
    if (coverImagePreview) {
      setDeletedImages((prev) => [...prev, coverImagePreview]);
      setCoverImagePreview(null);
    }
  };

  return {
    coverImagePreview,
    setCoverImagePreview,
    imagesPreview,
    setImagesPreview,
    deletedImages,
    handleCoverImageChange,
    handleImagesChange,
    handleRemoveImage,
    handleRemoveCoverImage,
  };
}
