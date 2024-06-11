import { FiX } from "react-icons/fi";

interface ImagePreviewProps {
  src: string;
  onRemove: () => void;
}

export function ImagePreview({ src, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative h-20 w-20">
      <img src={src} alt="Preview" className="h-full w-full object-cover" />
      <button
        type="button"
        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
        onClick={onRemove}
      >
        <FiX />
      </button>
    </div>
  );
}
