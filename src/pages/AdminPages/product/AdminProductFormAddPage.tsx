import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../../../redux/category/categoryApiSlice.ts";
import { useCreateProductMutation } from "../../../redux/product/productApiSlice.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { TApiError } from "../../../types/TApiError.ts";
import { Loader } from "../../../components/common/Loader.tsx";
import { FormSelect } from "../../../components/common/FormSelect.tsx";
import { FormInput } from "../../../components/common/FormInput.tsx";
import { ErrorMessage } from "../../../components/common/ErrorMessage.tsx";
import { CoverImagePreview } from "../../../components/admin/CoverImagePreview.tsx";
import { ImagePreview } from "../../../components/admin/ImagePreview.tsx";
import { useImagePreview } from "../../../hooks/useImagePreview";
import { FormFileInput } from "../../../components/common/FormFileInput";
import { FormTextArea } from "../../../components/common/FormTextArea.tsx";

interface IProductFormInputs {
  name: string;
  description: string;
  category: string;
  coverImage: FileList;
  images: FileList;
  stock: number;
  price: number;
  tags: string;
}

export function AdminProductFormAddPage() {
  const {
    data: categoriesResponse,
    error: categoryError,
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const categories = categoriesResponse?.data || [];
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IProductFormInputs>();

  const {
    coverImagePreview,
    imagesPreview,
    setImagesPreview,
    handleCoverImageChange,
    handleImagesChange,
    handleRemoveImage,
    handleRemoveCoverImage,
  } = useImagePreview();

  const onCreate: SubmitHandler<IProductFormInputs> = async (product) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", getCategoryId());
    formData.append("stock", product.stock.toString());
    formData.append("availableStock", product.stock.toString());

    formData.append("coverImage", product.coverImage[0]);
    Array.from(product.images).forEach((image) =>
      formData.append("images", image),
    );
    formData.append("tags", product.tags);

    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
      reset();
      handleRemoveCoverImage();
      setImagesPreview([]);
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError?.data?.message || "Error creating product");
    }
  };

  function getCategoryId() {
    const category = categories?.find(
      (cat) => cat.name === getValues("category"),
    );
    return category ? category._id : "";
  }

  if (isCategoryError) {
    const apiError = categoryError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message ||
          "An error occurred while fetching categories"
        }
      />
    );
  }

  if (isCategoryLoading) return <Loader />;

  return (
    <form>
      <h1 className="text-2xl mb-4">Create New Product</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
        <FormInput
          label="Product name"
          type="text"
          registration={register("name", {
            required: "Product name is required",
          })}
          error={errors.name}
        />
        <FormInput
          label="Product in stock"
          type="number"
          registration={register("stock", {
            required: "Product in stock is required",
          })}
          error={errors.stock}
        />
        <FormInput
          label="Product price"
          type="number"
          registration={register("price", {
            required: "Product price is required",
          })}
          error={errors.price}
        />
        <FormSelect
          label="Product category"
          registration={register("category", {
            required: "Product category is required",
          })}
          options={categories.map((cat) => ({
            value: cat.name,
            label: cat.name,
          }))}
          error={errors.category}
        />
        <FormInput
          label="Product tags (comma separated)"
          type="text"
          registration={register("tags", {
            required: "Product tags are required",
          })}
          error={errors.tags}
        />
        <FormTextArea
          label="Product description"
          registration={register("description", {
            required: "Product description is required",
          })}
          rows={1}
          error={errors.description}
        />

        <FormFileInput
          label="Product cover image"
          registration={register("coverImage", {
            required: "Product cover image is required",
          })}
          error={errors.coverImage}
          onChange={handleCoverImageChange}
          previews={
            coverImagePreview && <CoverImagePreview src={coverImagePreview} />
          }
        />
        <FormFileInput
          label="Product images"
          registration={register("images", {
            required: "Product images are required",
          })}
          error={errors.images}
          onChange={handleImagesChange}
          multiple
          previews={
            <div className="mt-4 flex flex-wrap gap-4">
              {imagesPreview.map((src, index) => (
                <ImagePreview
                  key={index}
                  src={src}
                  onRemove={() => handleRemoveImage(src)}
                />
              ))}
            </div>
          }
        />
      </div>
      <div className="my-10 flex gap-4 flex-wrap">
        <button
          type="button"
          onClick={handleSubmit(onCreate)}
          disabled={isCreating}
          className="btn btn-active btn-neutral w-full sm:max-w-xs"
        >
          {isCreating ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
