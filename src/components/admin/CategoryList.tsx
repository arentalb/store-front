import { TCategory } from "../../types/TCategory";

interface CategoryListProps {
  categories: TCategory[];
  onSelectCategory: (category: TCategory) => void;
  selectedCategory: TCategory | null;
}

export function CategoryList({
  categories,
  onSelectCategory,
  selectedCategory,
}: CategoryListProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {categories.map((cat) => (
        <button
          onClick={() => onSelectCategory(cat)}
          className={`btn ${selectedCategory?._id === cat._id ? "btn-secondary" : "btn-primary"}`}
          key={cat._id}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
