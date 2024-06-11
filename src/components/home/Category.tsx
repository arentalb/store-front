import { Link } from "react-router-dom";
import { TCategory } from "../../types/TCategory";

interface CategoryProps {
  category: TCategory;
}

export function Category({ category }: CategoryProps) {
  return (
    <Link
      to={`/products/?category=${category.name}`}
      className="btn-primary btn md:w-full"
    >
      {category.name}
    </Link>
  );
}
