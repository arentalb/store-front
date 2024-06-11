import { TCategory } from "../../types/TCategory";
import { useState } from "react";
import { Loader } from "../common/Loader.tsx";

interface CategoryUpdateFormProps {
  category: TCategory;
  onUpdate: (name: string) => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function CategoryUpdateForm({
  category,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: CategoryUpdateFormProps) {
  const [categoryName, setCategoryName] = useState(category.name);

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full max-w-xs"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button
        className="btn btn-success"
        type="button"
        disabled={isUpdating || categoryName === ""}
        onClick={() => onUpdate(categoryName)}
      >
        {isUpdating ? <Loader /> : "Update"}
      </button>
      <button
        className="btn btn-error"
        type="button"
        disabled={isDeleting}
        onClick={onDelete}
      >
        {isDeleting ? <Loader /> : "Delete"}
      </button>
    </div>
  );
}
