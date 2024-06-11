// src/pages/AdminPages/AdminProductFormEditPage.tsx

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../../../redux/category/categoryApiSlice.ts";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/product/productApiSlice.ts";
import { TApiError } from "../../../types/TApiError.ts";
import { Loader } from "../../../components/common/Loader.tsx";
import { FormInput } from "../../../components/admin/FormInput";
import { FormSelect } from "../../../components/admin/FormSelect";
import { ImagePreview } from "../../../components/admin/ImagePreview";
import { FiX } from "react-icons/fi";

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

export function AdminProductFormEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: categoryData,
    error: categoryError,
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoriesQuery();

  const {
    isFetching: isProductFetching,
    error: productError,
    isError: isProductError,
    refetch,
  } = useGetProductByIdQuery(id!, { skip: !id });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const categories = categoryData?.data;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IProductFormInputs>();

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const fetchProductDetails = useCallback(async () => {
    if (!id) return;

    try {
      const response = await refetch();
      if (response?.data) {
        const {
          name,
          description,
          category,
          price,
          stock,
          tags,
          coverImage,
          images,
        } = response.data.data;

        setValue("name", name);
        setValue("description", description);
        setValue("category", category.name);
        setValue("price", price);
        setValue("stock", stock);
        setValue("tags", tags.toString());

        setCoverImagePreview(coverImage);
        setImagesPreview(images);
      }
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError?.data?.message || "Error fetching product details");
    }
  }, [id, refetch, setValue]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  function getCategoryId() {
    const category = categories?.find(
      (cat) => cat.name === getValues("category"),
    );
    return category ? category._id : "";
  }

  const onEdit: SubmitHandler<IProductFormInputs> = async (product) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", getCategoryId());
    formData.append("stock", product.stock.toString());
    formData.append("tags", product.tags);
    if (product.coverImage[0]) {
      formData.append("coverImage", product.coverImage[0]);
    }
    Array.from(product.images).forEach((image) => {
      formData.append("images", image);
    });

    deletedImages.forEach((image) => {
      formData.append("deletedImages", image);
    });

    if (id) {
      try {
        await updateProduct({ product: formData, id }).unwrap();
        toast.success("Product updated successfully");
        navigate("/admin/product/all");
      } catch (error) {
        const apiError = error as TApiError;
        toast.error(apiError?.data?.message || "Error updating product");
      }
    }
  };

  const onDelete = async () => {
    if (id) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
        navigate("/admin/product/all");
      } catch (error) {
        const apiError = error as TApiError;
        toast.error(apiError?.data?.message || "Error deleting product");
      }
    }
  };

  if (isCategoryError) {
    const apiError = categoryError as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
  }
  if (isProductError) {
    const apiError = productError as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
  }

  if (isCategoryLoading || isProductFetching) {
    return <Loader />;
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
      setImagesPreview((prev) => [...prev, ...previewUrls]);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setImagesPreview((prev) => prev.filter((url) => url !== imageUrl));
    setDeletedImages((prev) => [...prev, imageUrl]);
  };

  const handleRemoveCoverImage = () => {
    if (coverImagePreview) {
      setDeletedImages((prev) => [...prev, coverImagePreview]);
      setCoverImagePreview(null);
    }
  };

  return (
    <form>
      <h1 className="text-2xl mb-4">Edit Product</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
        <FormInput
          label="Product name"
          type="text"
          registration={register("name", {
            required: "Product name is required",
          })}
          error={errors.name}
        />

        <label className="form-control w-full sm:max-w-xs">
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

        <FormInput
          label="Product price"
          type="number"
          registration={register("price", {
            required: "Product price is required",
          })}
          error={errors.price}
        />

        <FormInput
          label="Product stock"
          type="number"
          registration={register("stock", {
            required: "Product stock is required",
          })}
          error={errors.stock}
        />

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
              {...register("coverImage", { required: false })}
              onChange={handleCoverImageChange}
            />
            {errors.coverImage && (
              <p className="text-red-500">{errors.coverImage.message}</p>
            )}
          </label>
          {coverImagePreview && (
            <div className="relative mt-4 h-40 w-40">
              <img
                src={`${coverImagePreview}`}
                alt="Cover Preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={handleRemoveCoverImage}
              >
                <FiX />
              </button>
            </div>
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
              {...register("images", { required: false })}
              onChange={handleImagesChange}
            />
            {errors.images && (
              <p className="text-red-500">{errors.images.message}</p>
            )}
          </label>
          <div className="mt-4 flex flex-wrap gap-4">
            {imagesPreview.map((src, index) => (
              <ImagePreview
                key={index}
                src={src}
                onRemove={() => handleRemoveImage(src)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex gap-4 flex-wrap">
        <button
          type="button"
          onClick={handleSubmit(onEdit)}
          className="btn btn-success w-full sm:max-w-xs"
        >
          {isUpdating ? <Loader /> : "Update"}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="btn btn-error w-full sm:max-w-xs"
        >
          {isDeleting ? <Loader /> : "Delete"}
        </button>
      </div>
    </form>
  );
}
