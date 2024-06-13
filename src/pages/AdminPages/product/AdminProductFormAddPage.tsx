import { useState } from "react";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../../../redux/category/categoryApiSlice.ts";
import { useCreateProductMutation } from "../../../redux/product/productApiSlice.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { TApiError } from "../../../types/TApiError.ts";
import { Loader } from "../../../components/common/Loader.tsx";
import { FormSelect } from "../../../components/admin/FormSelect";
import { ImagePreview } from "../../../components/admin/ImagePreview";
import { FormInput } from "../../../components/common/FormInput.tsx";
import { ErrorMessage } from "../../../components/common/ErrorMessage.tsx";

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

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const previewUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagesPreview(previewUrls);
    }
  };

  const onCreate: SubmitHandler<IProductFormInputs> = async (product) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", getCategoryId());
    formData.append("stock", product.stock.toString());
    formData.append("coverImage", product.coverImage[0]);
    Array.from(product.images).forEach((image) => {
      formData.append("images", image);
    });
    formData.append("tags", product.tags);
    formData.append("availableStock", product.stock.toString());

    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
      reset();
      setCoverImagePreview(null);
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
      <h1 className="text-2xl mb-4">Create New Product </h1>
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
          options={
            categories?.map((cat) => ({ value: cat.name, label: cat.name })) ||
            []
          }
          error={errors.category}
        />

        <label className="form-control sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-12"
            {...register("description", {
              required: "Product description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </label>

        <FormInput
          label="Product tags (comma separated)"
          type="text"
          registration={register("tags", {
            required: "Product tags are required",
          })}
          error={errors.tags}
        />

        <div>
          <label className="form-control w-full sm:max-w-xs mb-4">
            <div className="label">
              <span className="label-text">Product cover image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full sm:max-w-xs"
              {...register("coverImage", {
                required: "Product cover image is required",
              })}
              onChange={handleCoverImageChange}
            />
            {errors.coverImage && (
              <p className="text-red-500">{errors.coverImage.message}</p>
            )}
          </label>
          {coverImagePreview && <ImagePreview src={coverImagePreview} />}
        </div>

        <div>
          <label className="form-control w-full sm:max-w-xs mb-4">
            <div className="label">
              <span className="label-text">Product images</span>
            </div>
            <input
              type="file"
              multiple
              className="file-input file-input-bordered w-full sm:max-w-xs"
              {...register("images", {
                required: "Product images are required",
              })}
              onChange={handleImagesChange}
            />
            {errors.images && (
              <p className="text-red-500">{errors.images.message}</p>
            )}
          </label>
          <div className="mt-4 flex flex-wrap gap-4">
            {imagesPreview.map((src, index) => (
              <ImagePreview key={index} src={src} />
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex gap-4 flex-wrap">
        <button
          type="button"
          onClick={handleSubmit(onCreate)}
          disabled={isCreating}
          className={`btn btn-active btn-neutral w-full sm:max-w-xs`}
        >
          {isCreating ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
