import { FiX } from "react-icons/fi";
import { FullImageUrl } from "../../utils/FullImageUrl.ts";

interface ImagePreviewProps {
  src: string;
  onRemove?: () => void;
}

export function ImagePreview({ src, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative h-20 w-20">
      <img
        src={FullImageUrl(src)}
        alt="Preview"
        className="h-full w-full object-cover rounded-md"
      />
      {onRemove && (
        <button
          type="button"
          className="absolute top-0 right-0 m-[2px] bg-red-500 text-white rounded-full p-1"
          onClick={onRemove}
        >
          <FiX />
        </button>
      )}
    </div>
  );
}
