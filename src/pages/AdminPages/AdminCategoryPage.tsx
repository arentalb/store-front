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
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";

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

  function selectCategoryHandler(targetCategory: TCategory) {
    if (selectedCategory && targetCategory._id === selectedCategory._id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(targetCategory);
    }
  }

  async function createHandler(name: string) {
    try {
      await createCategory({ name }).unwrap();
      toast.success("Category created");
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
        toast.success("Category updated");
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
        toast.success("Category deleted");
      } catch (error) {
        const apiError = error as TApiError;
        toast.error(apiError.data.message);
        setSelectedCategory(null);
      }
    }
  }

  if (isCategoriesError) {
    const apiError = categoriesError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message ||
          "An error occurred while fetching categories"
        }
      />
    );
  }
  if (isCategoriesLoading) return <Loader />;

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <div className="flex flex-col gap-10">
        <CategoryForm onSubmit={createHandler} isLoading={isCreating} />
        {categories?.length !== 0 ? (
          <CategoryList
            categories={categories}
            onSelectCategory={selectCategoryHandler}
            selectedCategory={selectedCategory}
          />
        ) : (
          <EmptyMessage message={"There is no category to show "} />
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
