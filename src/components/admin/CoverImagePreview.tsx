interface CoverImagePreviewProps {
  src: string;
}

export function CoverImagePreview({ src }: CoverImagePreviewProps) {
  return (
    <div className="relative mt-4 h-40 w-40">
      <img
        src={src}
        alt="Cover Preview"
        className="h-full w-full object-cover rounded"
      />
    </div>
  );
}
