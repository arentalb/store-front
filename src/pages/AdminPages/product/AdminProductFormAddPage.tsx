import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../../../redux/category/categoryApiSlice.ts";
import { useCreateProductMutation } from "../../../redux/product/productApiSlice.ts";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { TApiError } from "../../../types/TApiError.ts";
import { useState } from "react";

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
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const {
    data: categoryData,
    error: categoryError,
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoriesQuery();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const categories = categoryData?.data;

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IProductFormInputs>();

  function getCategoryId() {
    const category = categories?.find(
      (cat) => cat.name === getValues("category"),
    );
    return category ? category._id : "";
  }

  const onCreate: SubmitHandler<IProductFormInputs> = async (product) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", getCategoryId());
    formData.append("stock", product.stock.toString());
    formData.append("coverImage", product.coverImage[0]);
    Array.from(product.images).forEach((image) => {
      formData.append(`images`, image);
    });
    formData.append("tags", product.tags);
    formData.append("availableStock", product.stock.toString());

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
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

  if (isCategoryError) {
    const apiError = categoryError as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
  }

  if (isCategoryLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
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

  return (
    <form>
      <h1 className="text-2xl mb-4">
        {isEditMode ? "Edit Product" : "Create New Product"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </label>

        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product in stock</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("stock", {
              required: "Product in stock is required",
            })}
          />
          {errors.stock && (
            <p className="text-red-500">{errors.stock.message}</p>
          )}
        </label>

        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product price</span>
          </div>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("price", { required: "Product price is required" })}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </label>

        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product category</span>
          </div>
          <select
            className="select select-bordered"
            {...register("category", {
              required: "Product category is required",
            })}
          >
            <option disabled defaultChecked value="">
              Pick one
            </option>
            {categories &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </label>

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

        <label className="form-control sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product tags (comma separated)</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("tags", { required: "Product tags are required" })}
          />
          {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
        </label>

        <div>
          <label className="form-control w-full sm:max-w-xs mb-4">
            <div className="label">
              <span className="label-text">Product cover image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full sm:max-w-xs"
              {...register("coverImage", {
                required: isEditMode
                  ? false
                  : "Product cover image is required",
              })}
              onChange={handleCoverImageChange}
            />
            {errors.coverImage && (
              <p className="text-red-500">{errors.coverImage.message}</p>
            )}
          </label>
          {coverImagePreview && (
            <img
              src={coverImagePreview}
              alt="Cover Preview"
              className="mt-4 h-40 w-40 object-cover"
            />
          )}
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
                required: isEditMode ? false : "Product images are required",
              })}
              onChange={handleImagesChange}
            />
            {errors.images && (
              <p className="text-red-500">{errors.images.message}</p>
            )}
          </label>
          <div className="mt-4 flex flex-wrap gap-4">
            {imagesPreview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="h-20 w-20 object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex gap-4 flex-wrap">
        <button
          type="button"
          onClick={handleSubmit(onCreate)}
          className={`btn btn-active btn-neutral w-full sm:max-w-xs`}
        >
          {isCreating ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </form>
  );
}
