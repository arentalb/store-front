import { useState } from "react";
import { Loader } from "../common/Loader.tsx";

interface CategoryFormProps {
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

export function CategoryForm({ onSubmit, isLoading }: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = () => {
    onSubmit(categoryName);
    setCategoryName("");
  };

  return (
    <form>
      <h2 className="text-xl font-semibold mb-4">Create new category</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          disabled={isLoading || categoryName === ""}
          onClick={handleSubmit}
        >
          {isLoading ? <Loader /> : "Create new"}
        </button>
      </div>
    </form>
  );
}
