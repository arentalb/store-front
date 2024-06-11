import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/category/categoryApiSlice.ts";
import { toast } from "react-toastify";
import { TApiError } from "../../types/TApiError.ts";
import { TCategory } from "../../types/TCategory.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { useState } from "react";
import { CategoryForm } from "../../components/admin/CategoryForm";
import { CategoryList } from "../../components/admin/CategoryList";
import { CategoryUpdateForm } from "../../components/admin/CategoryUpdateForm";

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
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );

  if (isCategoriesError && categoriesError) {
    const apiError = categoriesError as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
  }

  async function createHandler(name: string) {
    try {
      await createCategory({ name }).unwrap();
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  }

  async function updateHandler(name: string) {
    if (selectedCategory) {
      try {
        await updateCategory({
          id: selectedCategory._id,
          name,
        }).unwrap();
        setSelectedCategory(null);
      } catch (error) {
        const apiError = error as TApiError;
        toast.error(apiError.data.message);
        setSelectedCategory(null);
      }
    }
  }

  async function deleteHandler() {
    if (selectedCategory) {
      try {
        await deleteCategory(selectedCategory._id).unwrap();
        setSelectedCategory(null);
      } catch (error) {
        const apiError = error as TApiError;
        toast.error(apiError.data.message);
        setSelectedCategory(null);
      }
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
        <CategoryForm onSubmit={createHandler} isLoading={isCreating} />
        {isCategoriesLoading ? (
          <div className="w-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <CategoryList
            categories={categories}
            onSelectCategory={selectCategoryHandler}
            selectedCategory={selectedCategory}
          />
        )}
        {selectedCategory && (
          <CategoryUpdateForm
            category={selectedCategory}
            onUpdate={updateHandler}
            onDelete={deleteHandler}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        )}
      </div>
    </div>
  );
}
