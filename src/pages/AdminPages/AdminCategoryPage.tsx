import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/category/categoryApiSlice.ts";
import { useState } from "react";
import { toast } from "react-toastify";
import { TApiError } from "../../types/TApiError.ts";
import { TCategory } from "../../types/TCategory.ts";
import { Loader } from "../../components/common/Loader.tsx";

export function AdminCategoryPage() {
  const {
    data: categoriesResponse,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const categories = categoriesResponse?.data || [];

  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );

  if (isCategoriesError && categoriesError) {
    const apiError = categoriesError as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
  }

  async function createHandler() {
    try {
      await createCategory({ name: categoryName }).unwrap();
      setCategoryName("");
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
      setCategoryName("");
    }
  }

  async function updateHandler() {
    if (selectedCategory) {
      try {
        await updateCategory({
          id: selectedCategory._id,
          name: selectedCategory.name,
        }).unwrap();
        setSelectedCategory(null);
      } catch (error) {
        const apiError = error as TApiError;

        toast.error(apiError.data.message);
        setSelectedCategory(null);
      }
    }
  }

  async function deleteHandler(id: string) {
    try {
      await deleteCategory(id).unwrap();
      setSelectedCategory(null);
    } catch (error) {
      const apiError = error as TApiError;

      toast.error(apiError.data.message);
      setSelectedCategory(null);
    }
  }

  function selectCategoryHandler(targetCategory: TCategory) {
    if (selectedCategory && targetCategory._id === selectedCategory._id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(targetCategory);
    }
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>

      <div className="flex flex-col gap-10">
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
              disabled={isCreating || categoryName === ""}
              onClick={createHandler}
            >
              {isCreating ? <Loader /> : "Create new"}
            </button>
          </div>
        </form>
        {isCategoriesLoading ? (
          <div className="w-full flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <button
                onClick={() => selectCategoryHandler(cat)}
                className="btn btn-primary"
                key={cat._id}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
        {selectedCategory && (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
              value={selectedCategory.name}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
                })
              }
            />
            <button
              className="btn btn-success"
              type="button"
              disabled={isUpdating || selectedCategory.name === ""}
              onClick={updateHandler}
            >
              {isUpdating ? <Loader /> : "Update"}
            </button>
            <button
              className="btn btn-error"
              type="button"
              disabled={isDeleting || selectedCategory.name === ""}
              onClick={() => deleteHandler(selectedCategory._id)}
            >
              {isDeleting ? <Loader /> : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
